from dataclasses import dataclass
from json import loads
from os import getenv
from typing import Any
from xml.dom.minidom import Document, Element  # nosec - B408 minidom used to create XML

from aws_lambda_powertools.logging import Logger
from boto3 import client
from requests import post
from xmltodict import parse

from .ccs_exceptions import CCSAPIResponseError
from .service import Service

logger = Logger(child=True)
CCS_SUCCESS_STATUS_CODE = 200


@dataclass(init=True, repr=True)
class CheckCapacitySummarySearch:
    """CCS Comparison Search."""

    age: int
    age_format: str
    disposition: int
    symptom_group: int
    symptom_discriminator_list: list[int]
    gender: str
    postcode: str
    search_environment: str
    search_distance: int = 20
    version: float = 1.5

    def search(self) -> list[dict[Service]]:
        """Searches for a services using the CCS API.

        Returns:
            list[dict[Service]]: List of DoS services
        """
        logger.info(
            f"CCS Request for environment {self.search_environment}",
            age=self.age,
            age_format=self.age_format,
            disposition=self.disposition,
            symptom_group=self.symptom_group,
            symptom_discriminator_list=self.symptom_discriminator_list,
            postcode=self.postcode,
            gender=self.gender,
            search_environment=self.search_environment,
            version=self.version,
        )
        username, password = self._get_username_and_password()
        data = self._build_request_data(username, password)
        ccs_search_path = getenv("CCS_SEARCH_PATH")
        environment_url = self._get_environment_url()
        logger.debug(
            f"CCS Request for environment {self.search_environment}",
            data=data,
            environment_url=environment_url,
        )
        response = post(
            url=f"{environment_url}{ccs_search_path}",
            headers={"content-type": "text/xml"},
            data=data,
            timeout=3,
        )

        if response.status_code == CCS_SUCCESS_STATUS_CODE:
            logger.info(
                f"{self.search_environment} CCS Response {response.status_code}",
                status_code=response.status_code,
                search_environment=self.search_environment,
            )
            return self._parse_xml_response(response.text)

        logger.error(
            f"{self.search_environment} CCS Response {response.status_code}",
            status_code=response.status_code,
            search_environment=self.search_environment,
            error_message=response.text,
        )
        raise CCSAPIResponseError(
            status_code=response.status_code,
            message=f"CCS Response {response.status_code}",
        )

    def _get_username_and_password(self) -> tuple[str, str]:
        """Gets the username and password for the CCS API.

        Returns:
            tuple[str, str]: Username and password for the CCS API
        """
        response = client("secretsmanager").get_secret_value(SecretId=getenv("CCS_SECRET_NAME"))
        secret = loads(response["SecretString"])
        return secret[getenv("CCS_USERNAME_KEY")], secret[getenv("CCS_PASSWORD_KEY")]

    def _build_request_data(self, username: str, password: str) -> str:
        """Builds the XML request data for the CCS API.

        Returns:
            str: XML request data for the CCS API
        """

        def add_basic_element(key: str, value: str, parent_element: Element) -> None:
            """Adds a basic element to the XML request data."""
            element = root.createElement(f"web:{key}")
            element.appendChild(root.createTextNode(value))
            parent_element.appendChild(element)

        root = Document()
        xml = root.createElement("soap:Envelope")
        xml.setAttribute("xmlns:soap", "http://www.w3.org/2003/05/soap-envelope")
        xml.setAttribute("xmlns:web", "https://nww.pathwaysdos.nhs.uk/app/api/webservices")
        root.appendChild(xml)
        header = root.createElement("soap:Header")
        xml.appendChild(header)
        add_basic_element("serviceVersion", str(self.version), header)

        body = root.createElement("soap:Body")
        xml.appendChild(body)
        check_capacity_summary = root.createElement("web:CheckCapacitySummary")
        body.appendChild(check_capacity_summary)

        user_info = root.createElement("web:userInfo")
        check_capacity_summary.appendChild(user_info)
        add_basic_element("username", username, user_info)
        add_basic_element("password", password, user_info)

        c = root.createElement("web:c")
        check_capacity_summary.appendChild(c)
        add_basic_element("postcode", str(self.postcode), c)
        add_basic_element("age", str(self.age), c)
        add_basic_element("ageFormat", self.age_format, c)
        add_basic_element("disposition", str(self.disposition), c)
        add_basic_element("symptomGroup", str(self.symptom_group), c)
        add_basic_element("searchDistance", str(self.search_distance), c)
        add_basic_element("gender", self.gender, c)
        symptom_discriminator_list = root.createElement("web:symptomDiscriminatorList")
        c.appendChild(symptom_discriminator_list)
        for symptom_discriminator in self.symptom_discriminator_list:
            _int = root.createElement("web:int")
            _int.appendChild(root.createTextNode(str(symptom_discriminator)))
            symptom_discriminator_list.appendChild(_int)

        return root.toxml()

    def _get_environment_url(self) -> str:
        """Gets the environment URL for the CCS API.

        Returns:
            str: Environment URL for the CCS API
        """
        return getenv("DEFAULT_ENVIRONMENT_URL")

    def _parse_xml_response(self, response_xml: str) -> list[dict[Service]]:
        """Parses the response from the CCS API.

        Args:
            response_xml (str): XML response from the CCS API

        Returns:
            list[dict[Service]]: List of services returned from the CCS API
        """
        response_dict: dict[str, Any] = parse(response_xml)
        body = response_dict.get("env:Envelope", {}).get("env:Body", {})
        services = (
            body.get("ns1:CheckCapacitySummaryResponse", {})
            .get("ns1:CheckCapacitySummaryResult", {})
            .get("ns1:serviceCareSummaryDestination", {})
        )
        api_response = []
        for service in services if isinstance(services, list) else [services]:
            dos_service = Service(
                name=service.get("ns1:name"),
                uid=service.get("ns1:id"),
                address=service.get("ns1:address"),
                service_type=service.get("ns1:serviceType", {}).get("ns1:name"),
                distance=service.get("ns1:distance"),
            )
            api_response.append(dos_service.__dict__)
            logger.debug("CCS Service", service=dos_service, search_environment=self.search_environment)
        return api_response

from dataclasses import dataclass
from aws_lambda_powertools.logging import Logger

logger = Logger(child=True)


@dataclass(repr=True)
class CheckCapacitySummarySearch:
    age: int
    age_format: str
    disposition: str
    symptom_group: str
    symptom_discriminator_list: list[int]
    search_distance: int
    gender: str
    version: float = 1.5

    def __init__(self, body: dict):
        print("body", body)
        self.age = body.get("age")
        self.age_format = body.get("age_format")
        self.disposition = body.get("disposition")
        self.symptom_group = body.get("symptom_group")
        self.symptom_discriminator_list = body.get("symptom_discriminator_list")
        self.search_distance = body.get("search_distance")
        self.gender = body.get("gender")

    def log_values(self):
        logger.info(
            "CCS Request captured with the following values:",
            age=self.age,
            age_format=self.age_format,
            disposition=self.disposition,
            symptom_group=self.symptom_group,
            symptom_discriminator_list=self.symptom_discriminator_list,
            search_distance=self.search_distance,
            gender=self.gender,
        )

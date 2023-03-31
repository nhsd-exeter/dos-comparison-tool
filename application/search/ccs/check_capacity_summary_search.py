from dataclasses import dataclass

from aws_lambda_powertools.logging import Logger

logger = Logger(child=True)


@dataclass(init=True, repr=True)
class CheckCapacitySummarySearch:
    age: int
    age_format: str
    disposition: int
    symptom_group: int
    symptom_discriminator_list: list[int]
    search_distance: int
    gender: str
    search_environment: str
    version: float = 1.5

    def log_values(self):
        logger.info(
            f"CCS Request for environment {self.search_environment}",
            age=self.age,
            age_format=self.age_format,
            disposition=self.disposition,
            symptom_group=self.symptom_group,
            symptom_discriminator_list=self.symptom_discriminator_list,
            search_distance=self.search_distance,
            gender=self.gender,
            search_environment=self.search_environment,
            version=self.version,
        )

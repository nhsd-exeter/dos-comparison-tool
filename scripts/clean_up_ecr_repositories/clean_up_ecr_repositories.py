from datetime import datetime, timedelta
from os import getenv

from boto3 import client
from pytz import timezone

ecr_client = client("ecr")
repository_prefix = getenv("ECR_REPOSITORY_PREFIX")
mgmt_account_id = getenv("AWS_ACCOUNT_ID_MGMT")
NEXT_TOKEN_DEFAULT_VALUE = "NextToken"  # noqa: S105


def delete_ecr_images(repository_name: str, image_digests: list) -> None:
    """Delete images from ECR repositories."""
    ecr_client.batch_delete_image(repositoryName=repository_name, registryId=mgmt_account_id, imageIds=image_digests)


def delete_untagged_images(repository: str) -> None:
    """Delete untagged images from ECR repositories."""
    next_token = NEXT_TOKEN_DEFAULT_VALUE
    while next_token:
        if next_token == NEXT_TOKEN_DEFAULT_VALUE:
            response = ecr_client.describe_images(
                repositoryName=repository,
                registryId=mgmt_account_id,
                maxResults=100,
                filter={
                    "tagStatus": "UNTAGGED",
                },
            )
        else:
            response = ecr_client.describe_images(
                repositoryName=repository,
                registryId=mgmt_account_id,
                maxResults=100,
                nextToken=next_token,
                filter={
                    "tagStatus": "UNTAGGED",
                },
            )
        images = response["imageDetails"]
        next_token = response.get("nextToken")
        if not images:
            return

        image_digests = [{"imageDigest": image["imageDigest"]} for image in images]
        delete_ecr_images(repository, image_digests)
        print(f"Deleting {len(image_digests)} images")


def delete_old_task_images(repository: str) -> None:
    """Delete old images from ECR repositories."""
    date = datetime.now(timezone("Europe/London")) - timedelta(days=30)
    next_token = NEXT_TOKEN_DEFAULT_VALUE
    while next_token:
        if next_token == NEXT_TOKEN_DEFAULT_VALUE:
            response = ecr_client.describe_images(
                repositoryName=repository,
                registryId=mgmt_account_id,
                maxResults=100,
                filter={
                    "tagStatus": "TAGGED",
                },
            )
        else:
            response = ecr_client.describe_images(
                repositoryName=repository,
                registryId=mgmt_account_id,
                maxResults=100,
                nextToken=next_token,
                filter={
                    "tagStatus": "TAGGED",
                },
            )
        images = response["imageDetails"]
        response.get("nextToken")
        if not images:
            return
        image_digests = [
            {"imageDigest": image["imageDigest"]}
            for image in images
            if image["imagePushedAt"] < date and "2023" in image["imageTags"][0]
        ]
        print(image_digests)
        print(f"Deleting {len(image_digests)} images")


if __name__ == "__main__":
    for repository in getenv("ECR_REPOSITORIES").split(","):
        print(f"Cleaning up {repository}")
        repository_name = f"{repository_prefix}/{repository}"
        delete_old_task_images(repository=repository_name)
        delete_untagged_images(repository=repository_name)

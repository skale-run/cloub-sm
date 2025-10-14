# Cloud Run Terraform configuration

This directory contains Terraform configuration to deploy the application to Google Cloud Run.

## Prerequisites

* [Terraform](https://www.terraform.io/downloads) 1.3 or newer.
* A Google Cloud project with billing enabled.
* Application container image available in Artifact Registry, Container Registry, or another accessible registry.
* Application default credentials or a service account key file configured for Terraform.

## Usage

1. Copy `terraform.tfvars.example` to `terraform.tfvars` and adjust the values for your environment.
2. Initialize the working directory:
   ```bash
   terraform init
   ```
3. Review the planned changes:
   ```bash
   terraform plan
   ```
4. Apply the configuration:
   ```bash
   terraform apply
   ```

## Inputs

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `project_id` | Google Cloud project ID | `string` | n/a |
| `region` | Deployment region | `string` | `"us-central1"` |
| `service_name` | Cloud Run service name | `string` | n/a |
| `container_image` | Container image to deploy | `string` | n/a |
| `allow_unauthenticated` | Allow unauthenticated access | `bool` | `true` |
| `environment_variables` | Environment variables for the container | `map(string)` | `{}` |

## Outputs

| Name | Description |
| --- | --- |
| `service_url` | URL of the deployed Cloud Run service |

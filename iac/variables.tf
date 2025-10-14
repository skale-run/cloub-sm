variable "project_id" {
  description = "The Google Cloud project ID where the Cloud Run service will be deployed."
  type        = string
}

variable "region" {
  description = "The region to deploy the Cloud Run service into."
  type        = string
  default     = "europe-west1"
}

variable "service_name" {
  description = "Name for the Cloud Run service."
  type        = string
}

variable "container_image" {
  description = "The container image to deploy, for example gcr.io/project/image:tag."
  type        = string
}

variable "allow_unauthenticated" {
  description = "Whether to allow unauthenticated (public) access to the service."
  type        = bool
  default     = true
}

variable "environment_variables" {
  description = "Environment variables to inject into the running container."
  type        = map(string)
  default     = {}
}

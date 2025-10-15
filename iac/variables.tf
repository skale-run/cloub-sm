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

variable "image_version" {
  description = "Container image tag applied to lkany services when explicit image URIs are not provided."
  type        = string
  default     = null
}


variable "app_image" {
  description = "Optional override for the lkany web application container image URI."
  type        = string
  default     = null
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

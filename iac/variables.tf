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
  description = "Fully qualified container image to deploy, for example gcr.io/project/image:tag. If unset, provide container_image_repository and image_version instead."
  type        = string
  default     = null
}

variable "container_image_repository" {
  description = "Container repository without a tag, for example europe-west1-docker.pkg.dev/project/repository/image. Used together with image_version when container_image is not provided."
  type        = string
  default     = null
}

variable "image_version" {
  description = "Image tag appended to container_image_repository when container_image is not set."
  type        = string
  default     = null
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

variable "app_domain" {
  description = "Optional application domain to map to the Cloud Run service."
  type        = string
  default     = null
}

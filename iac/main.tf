terraform {
  required_version = ">= 1.5.0"

  backend "gcs" {
    bucket = "wac-adherents-tfstate"
    prefix = "club-sm"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.8"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.8"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

locals {
  container_image = var.container_image != null ? var.container_image : (
    var.container_image_repository != null && var.image_version != null ?
    "${var.container_image_repository}:${var.image_version}" :
    null
  )
}

resource "google_project_service" "run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifact_registry" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_service_account" "cloud_run" {
  account_id   = "${var.service_name}-svc"
  display_name = "Cloud Run service account for ${var.service_name}"
}

data "google_storage_bucket" "wac_io_tfstate" {
  name = "wac-adherents-tfstate"
}

resource "google_storage_bucket_iam_member" "cloud_run_object_viewer" {
  bucket = data.google_storage_bucket.wac_io_tfstate.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.cloud_run.email}"
}
resource "google_cloud_run_service" "service" {
  name     = var.service_name
  location = var.region

  lifecycle {
    precondition {
      condition     = local.container_image != null
      error_message = "Set either container_image or container_image_repository together with image_version."
    }
  }

  template {
    spec {
      service_account_name = google_service_account.cloud_run.email

      containers {
        image = local.container_image

        dynamic "env" {
          for_each = var.environment_variables

          content {
            name  = env.key
            value = env.value
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_project_service.run,
    google_project_service.artifact_registry
  ]
}

resource "google_cloud_run_service_iam_member" "unauthenticated" {
  count = var.allow_unauthenticated ? 1 : 0

  location = google_cloud_run_service.service.location
  project  = var.project_id
  service  = google_cloud_run_service.service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" {
  description = "The URL of the deployed Cloud Run service."
  value       = google_cloud_run_service.service.status[0].url
}

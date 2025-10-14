terraform {
  required_version = ">= 1.3.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.51.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
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

resource "google_artifact_registry_repository_iam_member" "cloud_run_data_reader" {
  project    = var.project_id
  location   = var.region
  repository = "data"
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_cloud_run_service" "service" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      service_account_name = google_service_account.cloud_run.email

      containers {
        image = var.container_image

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

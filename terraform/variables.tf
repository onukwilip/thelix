variable "project_id" {
  description = "Your GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region to deploy in"
  default     = "us-central1"
}

variable "zone" {
  description = "The GCP zone to deploy in"
  default     = "us-central1-a"
}

variable "ssh_public_key" {
  description = "SSH public key for VM access"
  type        = string
}

variable "ssh_user" {
  description = "SSH user for VM access"
  type        = string
}

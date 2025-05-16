provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

resource "google_compute_instance" "thelix-vm" {
  name         = "thelix-vm"
  machine_type = "e2-medium"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
      size  = 20
    }
  }

  network_interface {
    network = "default"

    access_config {
      // This block gives the instance an external IP
    }
  }

  metadata = {
    enable-oslogin = "TRUE"
    ssh-keys       = "${var.ssh_user}:${var.ssh_public_key}"
  }

  tags = ["http-server", "https-server"]

  labels = {
    env = "monitoring"
  }
}

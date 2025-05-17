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
    enable-oslogin = "FALSE"
    ssh-keys       = "${var.ssh_user}:${var.ssh_public_key}"
  }

  tags = ["http-server", "https-server", "thelix"]

  labels = {
    env = "monitoring"
  }
}

resource "google_compute_firewall" "thelix-allow-inbound" {
  name    = "thelix-allow-inbound"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "81", "82", "3000", "3001", "5000", "6000", "8080", "9090", "9100"]
  }

  source_ranges = ["0.0.0.0/0"]

  target_tags = ["thelix"]

  direction = "INGRESS"

  description = "Allow inbound traffic on web and monitoring ports"
}

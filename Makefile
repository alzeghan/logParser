SHELL := /bin/bash

DOCKER_IMAGE = "test"

all: image

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

image:         ## Build the docker image
	# docker build -t current -t $(IMAGE_NAME) -t $(DOCKER_IMAGE) -t $(DOCKER_IMAGE_TAG) .


services:      ## Creates necessary services for development
	docker compose -f ./devops/docker-compose.services.yml up --force-recreate

services-d:    ## Creates necessary services for development in background
	docker compose -f ./devops/docker-compose.services.yml up -d

services-down:      ## Creates necessary services for development
	docker compose -f ./devops/docker-compose.services.yml down

dev-run:       ## Run app locally
	docker compose -f ./devops/docker-compose.yml -f ./devops/docker-compose.override.dev.yml up --force-recreate

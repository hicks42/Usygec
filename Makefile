.PHONY: init launch dkbash tests auth cache help

.DEFAULT_GOAL = help

# Variables
PROJECT_NAME := $(shell basename "$(CURDIR)")
VARIABLE_FILE := .variable
FILE_NAME?=.variable
CONTAINER = $(PROJECT_NAME)-www-container
DOCKER = docker
DOCKER_COMPOSE = docker-compose
EXEC = $(DOCKER) exec -w /var/www/project/ $(CONTAINER)
EXEC_APP = $(DOCKER) exec -w /var/www/project/app $(CONTAINER)
EXECIT = $(DOCKER) exec -it -w /var/www/project/app $(CONTAINER)
EXEP = $(DOCKER) exec -w $(CONTAINER)
PHP = $(EXEC_APP) php
COMPOSER = $(EXEC_APP) composer
YARN = $(EXEC_APP) yarn
SYMFONY_CONSOLE = $(PHP) bin/console

# Colors
RESET =				/bin/echo -e "\x1b[0m\#\# $1\x1b[0m"
BLACK =				/bin/echo -e "\x1b[30m\#\# $1\x1b[0m"
RED = 				/bin/echo -e "\x1b[31m\#\# $1\x1b[0m"
GREEN = 			/bin/echo -e "\x1b[32m\#\# $1\x1b[0m"
YELLOW = 			/bin/echo -e "\x1b[33m\#\# $1\x1b[0m"
BLUE = 				/bin/echo -e "\x1b[34m\#\# $1\x1b[0m"
PURPLE = 			/bin/echo -e "\x1b[35m\#\# $1\x1b[0m"
LIGHT_BLUE = 	/bin/echo -e "\x1b[36m\#\# $1\x1b[0m"
WHITE = 			/bin/echo -e "\x1b[37m\#\# $1\x1b[0m"

## —— 🔥 App ——
testing:


dkbash: ## Bash dans le container www
	$(EXECIT) bash

launch: ## USYGEC Installation complete de symphony+webpack+bootstrap+git
	$(MAKE) INIT
	$(MAKE) CHANGE_DKCOMPOSE
	$(MAKE) dockerprev
	$(MAKE) stop
	$(MAKE) start
	$(MAKE) SYMFONY
	$(MAKE) WEBPACK
	$(MAKE) WEBPACK_CONFIG
	$(MAKE) BOOTSTRAP
	$(MAKE) GIT_INIT
	$(MAKE) GIT_SETUP
	$(MAKE) CREATE_ENVLOCAL
	$(MAKE) stop
	$(MAKE) start
	@$(call GREEN,"L\'application est dispo sur : http://localhost:8080/")
	@$(call LIGHT_BLUE,"En temps voulu : ajout du repo distant + push master avec : make gad_origin")

INIT: ## Stop all containers and get sudo
	$(MAKE) stop
	sudo chown -R $$USER ./

CHANGE_DKCOMPOSE: ## Nomme les containers docker + le Network
	sed -i 's/XXXX/$(PROJECT_NAME)/g' docker-compose.yml

RESET_DKCOMPOSE: ## Supprime les modifs du docker-compose.yml
	sed -i 's/$(PROJECT_NAME)/XXXX/g' docker-compose.yml

SYMFONY: ## Installation de symfony + webapp + reset passwd
	$(EXEC) symfony new app --version=5.4 --webapp
	# $(EXEC_APP) composer create-project symfony/skeleton:"^5.4" app
	# $(EXEC_APP) composer require webapp


WEBPACK: ## Installation de Webpack + yarn + sass-loader
	$(EXEC_APP) composer require symfony/webpack-encore-bundle
	$(EXEC_APP) npm install --global yarn
	$(YARN)
	$(EXEC_APP) yarn add node-sass sass-loader --dev
	$(YARN)
	sudo chown -R $$USER ./

WEBPACK_CONFIG: ## change app.js, app.css, enable SASS and Jquery
	mv app/assets/styles/app.css app/assets/styles/app.scss
	sed -i 's/app\.css/app.scss/g' app/assets/app.js
	sed -i 's|//\.enableSassLoader|\.enableSassLoader|g'  app/webpack.config.js
	sed -i 's|//\.autoProvidejQuery|\.autoProvidejQuery|g'  app/webpack.config.js

BOOTSTRAP: ## Installation de Bootstrap + jquery + popper
	$(EXEC_APP) yarn add bootstrap --dev
	$(EXEC_APP) yarn add jquery @popperjs/core --dev
	$(YARN)
	sudo chown -R $$USER ./

CLEAN: ## Supprime le fichier donné
ifneq ($(wildcard $(FILE_NAME)),)
	rm -rf $(FILE_NAME)
endif

GIT_INIT: ## Initiation de git
ifneq ($(wildcard app/.git),)
	rm -rf app/.git
endif
	git init
	ssh-add
	git checkout -b master
	sudo chown -R $$USER ./

GIT_SETUP: ## Fill the gitignore file
	sed -i '1i Makefile' app/.gitignore
	sed -i '2i \.*' app/.gitignore
	sed -i 's/public/app\/public/g' app/.gitignore
	sed -i 's/config/app\/config/g' app/.gitignore
	sed -i 's/^\///' app/.gitignore
	mv app/.gitignore ./

CREATE_ENVLOCAL: ## Creation du env local file
	echo "APP_ENV=dev\nSECURE_SCHEME=http\nDATABASE_URL=\"mysql://root:secret@db-service:3306/db_$(PROJECT_NAME)?serverVersion=5.6\"\nMAILER_DSN=smtp://fab6d1c006de17:0d51d8a4bd9e65@smtp.mailtrap.io:2525?encryption=tls&auth_mode=login" > app/.env.local

gad-origin: ## Etablir l\'adresse du repo en remote et push sur master
	@echo "Veuillez entrer l'adresse du dépôt distant : "
	@read REMOTE_URL; \
	git remote add origin $$REMOTE_URL
	git add .
	git comit -m "first comit"
	git push -u origin master

auth: ## Ajout des bundle reset password et verify mail
	$(EXEC_APP) composer require symfonycasts/verify-email-bundle
	$(EXEC_APP) composer require symfonycasts/reset-password-bundle

cache: ## Clear cache
	$(SYMFONY_CONSOLE) cache:clear

dump: ## Clear cache
	$(EXEC_APP) composer dump-autoload

raz: ## Remise a zéro de l'installation
	sudo chown -R $$USER ./
	$(MAKE) RESET_DKCOMPOSE
	$(MAKE) CLEAN FILE_NAME=.git
	$(MAKE) CLEAN FILE_NAME=app
	$(MAKE) stop
	@$(call LIGHT_BLUE,"L\'application est entierement detruite.")

## —— ✅ Test ——
tests: ## Run all tests
	$(MAKE) database-init-test
	$(PHP) bin/phpunit --testdox tests/Unit/
	$(PHP) bin/phpunit --testdox tests/Functional/
	$(PHP) bin/phpunit --testdox tests/E2E/

database-init-test: ## Init database for test
	$(SYMFONY_CONSOLE) d:d:d --force --if-exists --env=test
	$(SYMFONY_CONSOLE) d:d:c --env=test
	$(SYMFONY_CONSOLE) d:m:m --no-interaction --env=test
	$(SYMFONY_CONSOLE) d:f:l --no-interaction --env=test

unit-test: ## Run unit tests
	$(MAKE) database-init-test
	$(PHP) bin/phpunit --testdox tests/Unit/

functional-test: ## Run functional tests
	$(MAKE) database-init-test
	$(PHP) bin/phpunit --testdox tests/Functional/

# PANTHER_NO_HEADLESS=1 ./bin/phpunit --filter LikeTest --debug to debug with Chrome
e2e-test: ## Run E2E tests
	$(MAKE) database-init-test
	$(PHP) bin/phpunit --testdox tests/E2E/

## —— 🐳 Docker ——
dockerprev:
	docker network create app-$(PROJECT_NAME)

start: ## Start app
	$(MAKE) docker-start

docker-start:
	$(DOCKER_COMPOSE) up -d

stop: ## Stop app
	$(MAKE) docker-stop

docker-stop:
	$(DOCKER_COMPOSE) stop
	@$(call RED,"The containers are now stopped.")

dkdestroy: ## Detruit les containers et les images du projet
	docker ps -aq --filter "name=$(PROJECT_NAME)*" | xargs -r docker rm -f
	docker images -q --filter "reference=$(PROJECT_NAME)*" | xargs -r docker rmi -f

dependencies:
	$(MAKE) composer-install
	$(MAKE) yarn

## —— 🎻 Composer ——
composer-install: ## Install dependencies
	$(COMPOSER) install
	$(MAKE) dump
	$(EXEC_APP) symfony check:security

composer-update: ## Update dependencies
	$(COMPOSER) update

## —— 🐈 YARN —————————————————————————————————————————————————————————————————
yarn: ## Install all YARN dependencies
	$(YARN)

yarn-update: ## Update all YARN dependencies
	$(YARN) update

watch: ## Update all YARN dependencies automatically
	$(YARN) encore dev --watch

dev: ## Update all YARN dependencies automatically
	$(YARN) encore dev

build: ## Build all YARN dependencies
	$(YARN) build

## —— :computer: remote ———————————————————————————————————————————————————————————————————————
conx:
	./conex

deploy:
	$(MAKE) build
	./deployit

## —— 📊 Database ——
database-init: ## Init database
	$(MAKE) database-drop
	$(MAKE) database-create
	$(MAKE) database-migrate
	$(MAKE) database-fixtures-load

dbcreate:
	$(MAKE) database-create

database-drop: ## Create database
	$(SYMFONY_CONSOLE) d:d:d --force --if-exists

database-create: ## Create database
	$(SYMFONY_CONSOLE) d:d:c --if-not-exists

database-remove: ## Drop database
	$(SYMFONY_CONSOLE) d:d:d --force --if-exists

database-migration: ## Make migration
	$(SYMFONY_CONSOLE) make:migration

migration: ## Alias : database-migration
	$(MAKE) database-migration

database-migrate: ## Migrate migrations
	$(SYMFONY_CONSOLE) d:m:m --no-interaction

migrate: ## Alias : database-migrate
	$(MAKE) database-migrate

migrate-prev: ## cancel-migrate
	$(SYMFONY_CONSOLE) d:m:m prev --no-interaction

database-fixtures-load: ## Load fixtures
	$(SYMFONY_CONSOLE) d:f:l --no-interaction

fixtures: ## Alias : database-fixtures-load
	$(MAKE) database-fixtures-load

## —— 🛠️  Others ——
help: ## List of commands
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

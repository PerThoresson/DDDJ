# Shell to use with Make
SHELL := /bin/bash

# Convenience variables
DATABASE := database
CLIENT := client
SERVER := server
CDJ_SERVICE := cdjService


# Targets to start stuff
database:
	@echo "Starting $(DATABASE) process(es), see $(DATABASE).log for output"; (mongod 2>&1) > $(DATABASE).log &

dddjClient:
	@echo "Starting $(CLIENT) process(es), see $(CLIENT).log for output"; (cd $(CLIENT) && npm install 2>&1 && npm start 2>&1 && cd ..) > $(CLIENT).log &

dddjServer:
	@echo "Starting $(CLIENT) process(es), see $(SERVER).log for output"; (cd $(SERVER) && npm install 2>&1 && nodemon index.js 2>&1 && cd ..) > $(SERVER).log &

dddjCdjService:
	@echo "TODO: Starting cdjService process(es), see $(CDJ_SERVICE).log for output"; (echo "TODO") > $(CDJ_SERVICE).log &

all: database dddjCdjService dddjServer dddjClient


# Targets to clean up stuff
clearDatabase:
	mongo dddj --eval "db.dropDatabase()"

cleanDatabase:
	@echo "Cleaning up $(DATABASE) process(es), see $(DATABASE).log for output"; (ps ax | grep mongod 2>&1 | awk '{print $$1}' | xargs -n1 kill -9 2>&1) > $(DATABASE).log &

cleanClient:
	@echo "Cleaning up $(CLIENT) process(es), see $(CLIENT).log for output"; (ps ax | grep webpack-dev-server.js | awk '{print $$1}' | xargs -n1 kill -9 2>&1) > $(CLIENT).log &

cleanServer:
	@echo "Cleaning up $(SERVER) process(es), see $(SERVER).log for output"; (ps ax | grep index.js | awk '{print $$1}' | xargs -n1 kill -9 2>&1) > $(SERVER).log &

cleanCdjService:
	@echo "TODO: Cleaning up $(CDJ_SERVICE) process(es), see $(CDJ_SERVICE).log for output"; (echo "TODO") >> $(CDJ_SERVICE).log &

cleanAll: cleanDatabase cleanCdjService cleanServer cleanClient


help:
	@printf "\nWelcome to DDDJ!\n\nRun 'make all' to run everything, and run 'make cleanAll' to clean up everything.\nLook in the Makefile for more info. :)\n"

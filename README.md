# herrd-push-server [![Build Status](https://travis-ci.org/Herrd/herd-push-server.svg?branch=master)](https://travis-ci.org/Herrd/herrd-push-server)

Push notification server for Herrd

## Getting Started

```bash
$ git pull git@github.com:Herrd/herrd-push-server.git
$ npm install
$ npm install knex -g
$ knex migrate:latest
$ DEBUG=herrd-push-server:* ./bin/www
```

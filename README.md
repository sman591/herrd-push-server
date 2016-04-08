# herrd-push-server [![Build Status](https://travis-ci.org/Herrd/herrd-push-server.svg?branch=master)](https://travis-ci.org/Herrd/herrd-push-server)

Push notification server for Herrd

## Getting Started

```bash
$ git pull git@github.com:Herrd/herrd-push-server.git
$ npm install
$ npm install knex -g
$ knex migrate:latest
$ DEBUG=herrd-push-server:* ./bin/www
```

## Environment Variables

We use [dotenv](https://github.com/motdotla/dotenv) to simplify environment variable configuration.

To get started quickly, simply:

```bash
$ cp .env.sample .env
```

And update the values in `.env`

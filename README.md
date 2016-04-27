# herrd-push-server [![Build Status](https://travis-ci.org/Herrd/herrd-push-server.svg?branch=master)](https://travis-ci.org/Herrd/herrd-push-server)

Push notification server for Discourse powered by Herrd

## Getting Started

```bash
$ git pull git@github.com:Herrd/herrd-push-server.git
$ npm install
$ npm install -g knex
$ npm install -g bower
$ knex migrate:latest
$ bower install
$ DEBUG=herrd-push-server:* ./bin/www
```

If you'd like to restart the server with each file change, install [nodemon](https://github.com/remy/nodemon):

```bash
$ npm install -g nodemon
$ DEBUG=herrd-push-server:* nodemon bin/www
```

Either way, the server will now be running at [http://localhost:3000/](http://localhost:3000/).

## Environment Variables

We use [dotenv](https://github.com/motdotla/dotenv) to simplify environment variable configuration.

To get started quickly, simply:

```bash
$ cp .env.sample .env
```

And update the values in `.env`

## User Authentication

All administrative pages (such as `/apps/`) require authentication.

The first user can be created by going to `/auth/signup`. After that, the sign up page will only work for logged in users.

## API Calls

Each API call requires an `api_key` parameter. This API key is associated directly to a Discourse forum. API results will reflect actions directly for that Discourse forum - no need to pass in the hostname each time.

#### GET `/api/players`

Lists all players associated with a Discourse forum

##### Parameters:
* `api_key` - The API Key

##### Example:
```bash
$ curl https://push.herrd.io/api/players?api_key=abc123
```

#### POST `/api/send`

Send a notification. A notification is sent to all devices registered for the provided user.

##### Data:
* `api_key` - The API Key
* `user_id` - The Discourse user ID of who should receive the notification
* `contents` - The object of contents to send

Data can be sent via JSON body or `x-www-form-urlencoded`

##### Example:
```bash
$ curl https://push.herrd.io/api/send \
   -d api_key=test \
   -d user_id=1 \
   -d contents[en]="hello world"
```

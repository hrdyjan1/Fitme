# Fit.me: Backend

Basic info for Fit.me app backend usage

## Requirements

- Node.js v12 (or later)
- Yarn

## Setup ENV Variables

Edit `.env` file (DB user, password, ...)

Mandatory fields:

- PORT (default= 4000)
- JWT_SECRET
- DB_HOST
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_PORT (default=4242)

## Install Dependencies

```bash
yarn install
```

## `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Seed Database

Using phpMyAdmin or MySQL Workbench run following SQL: [`./db/seed.sql`](./db/seed.sql)

## Run Production

```bash
yarn start
```

## Build Production

```bash
yarn build
```

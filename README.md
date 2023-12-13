# Worklogger

Worklogger with PocketBase and React

## Tech Stack

- Pocketbase
- React
- ReactQuery

## Installation

### Requirements

- Node V16+
- Docker

### Build

Open client directory and run one of following command

```npm install / yarn / pnpm install```

After installation of above dependecies modify code as per your requirments and run one following command

```npm run build / yarn build / pnpm build ```

If you have made any chages to fields open Dockerfile in server directory and comment out pb_migrations line

Run
```sh
  docker-compose build
  docker-compose up -d
```

```haskell
Go to _addr_:9090/_/ and create super user

Create new user inside users record, this account will be used for communication with application

Visit _addr_:9191/_/ and create super user
```

```_addr_``` is localhost for local installation or your server's public IP address for cloud installation

## Licence
MIT @ 2023

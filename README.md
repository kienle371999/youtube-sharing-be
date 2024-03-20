# The server side for VCX

- Prerequisite

> NodeJS 16+ (20.11.1)

- Step 1:

  > Install the node modules
  > `npm install`
  >
- Step 2:

  > Copy the env file
  > `cp .env.example  .env`
  >
- Step 3:

  > install development environment by Docker
  > `docker-compose -f docker-compose-dev.yml up -d`
  >
- Step 4:

  > Run the app
  > `npm run start:dev`
  >

## Development

- Make module

```bash
$ npm i -g @nestjs/cli

$ nest g module api/user && nest g service api/user && nest g controller api/user
```

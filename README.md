# The server side for Youtube Sharing App

## Introduction

This is a platform to share youtube videos

## Prerequisites

NodeJS 16+ (20.11.1)

## Installation

```
npm install
cp .env.example .env
docker-compose -f docker-compose-dev.yml up -d
```

## Seeding

```
npm run typescript src/seeding/user.seeding.ts
```

## Running application

```
npm run dev
```

## Deployment

I use the Github Actions to make CI/CD

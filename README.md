# Vigor Computing Machine

An RPC style API for managing for a d&d character's healing and damage.

## Getting started

### Running localy
This project uses [bun](https://bun.sh).
If you have it installed you can run the following commands to start the server:
```bash
bun install && bun serve
```

You can run it on a different port by setting the `PORT` environment variable:
```bash
PORT=8080 bun serve
```

### Running with Docker

```bash
docker build --pull -t vigor-computing .
docker run -p 3000:3000 vigor-computing
```

### Viewing the swagger documentation

While the server is running, you can view the documentation at `http://{host}:{port}/swagger`.
(e.g. [http://localhost:3000/swagger](http://localhost:3000/swagger))

### Running tests

To run the tests locally:
```bash
bun test
```

## Technologies used
- [Typescript](https://www.typescriptlang.org/)
- [bun](https://bun.sh) - Runtime, testing, package management
- [Elysia](https://elysiajs.com) - API framework
    - [Eden](https://github.com/elysiajs/eden) - Elysia client (used for testing)
    - [@elysiajs/swagger]() - OpenAPI documentation
    - [@bogeychan/elysia-logger](https://github.com/bogeychan/elysia-logger) - Logging
- [Drizzle](https://drizzlejs.com) - ORM
- [libsql](https://libsql.com) - SQLite database

## Example Queries

Get the character's current state:

```bash
curl http://localhost:3000/
```

Apply damage to the character:
```bash
curl http://localhost:3000/doDamage \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "amount": 1,
  "type": "poison"
}'
```

Apply healing to the character:
```bash
curl http://localhost:3000/doHeal \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "amount": 1
}'
```

Apply temporary hp to the character:
```bash
curl http://localhost:3000/addTempHp \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "amount": 1
}'
```

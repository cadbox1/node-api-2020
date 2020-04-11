# Node API 2020

A Node API built by Cadell in 2020.

## 🔧 Tools

- [Postgres](https://www.postgresql.org/) and [node-postgres](https://node-postgres.com/) for the database.
- [TypeScript](https://www.typescriptlang.org/) for type checking.
- [Jest](https://facebook.github.io/jest/) for testing.
- [Express](https://expressjs.com/) for routing.

## Testing

[Integration tests](https://kentcdodds.com/blog/write-tests) are the focus of this project, testing from the endpoint to the database and back again.

Postgres is run in a docker and is populated with some common test data that all tests can run against.

Then, for each test:

- We start a database transaction
- [Supertest](https://github.com/visionmedia/supertest) calls the endpoint.
- The response is validated.
- The database is validated.
- The transaction is rolled back leaving the database in a clean state.

Transactions mean that tests can run concurrently and you don't have to write any cleanup scripts.

Jest has a watch mode that runs the appropriate tests as you save your changes.

## 💻 Running Locally

Install dependencies first.

```
npm install
```

Start the Postgres database.

```
docker-compose up
```

Run the server with automatic restarts. Run in another terminal alongside the database.

```
npm run start
```

Run the tests with automatic restarts. Run in another terminal alongside the database.

```
npm run test:watch
```

## All Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## Exploring the Datbase

The `docker-compose.yml` file that runs the Postgres database is from https://github.com/khezen/compose-postgres so you can follow the instructions from [Access to PgAdmin](https://github.com/khezen/compose-postgres).

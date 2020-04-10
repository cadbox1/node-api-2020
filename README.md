# Node API 2020

A Node API built by Cadell in 2020.

## 🔧 Tools

- [Postgres](https://www.postgresql.org/) and (node-postgres)[https://node-postgres.com/] for the database.
- [TypeScript](https://www.typescriptlang.org/) for type checking.
- [Jest](https://facebook.github.io/jest/) for testing.
- [Express](https://expressjs.com/) for routing.

## Testing

The focus of this project is [integration testing](https://kentcdodds.com/blog/write-tests), where we put each test in it's own transaction, hit the endpoint, then roll back the database transaction. This allows us to get maximum coverage for minimum effort and the database transactions offer a strong seperation between tests so we can run them concurrently.

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

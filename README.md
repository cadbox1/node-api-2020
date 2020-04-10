# Node API 2020

A Node API built by Cadell in 2020.

## 🔧 Tools

- [Postgres](https://www.postgresql.org/) and (node-postgres)[https://node-postgres.com/] for the database.
- [TypeScript](https://www.typescriptlang.org/) for type checking.
- [Jest](https://facebook.github.io/jest/) for testing.
- [Express](https://expressjs.com/) for routing.

## 💻 Running Locally

Install dependencies.

```
npm install
```

Run run tests in watch mode for automatic re-runs.

```
npm run test:watch
```

## All Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

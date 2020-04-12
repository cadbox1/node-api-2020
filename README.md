# Node API 2020

A Node API built by Cadell in 2020.

## 🔧 Tools

- [Postgres](https://www.postgresql.org/) and [node-postgres](https://node-postgres.com/) for the database.
- [TypeScript](https://www.typescriptlang.org/) for type checking.
- [Jest](https://facebook.github.io/jest/) for testing.
- [Express](https://expressjs.com/) for routing.

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

## Fetching toMany Relations

Each task has tags but how do we return the tags of each task without sacrificing performance?

### UI

The first way would be to check if your really need to display a toMany relationship in a list view. If it has more than a few results then you might be better off displaying the relations in a 'detail' view instead of a list.

Let's assume we definitely want to display tags on a list view. In that case I would recommend an upper limit of maybe 5 tags per task for example. You'll probably be limited by frontend real estate more than anything.

### Fetch in 2 Queries

Fetch toMany relationships in a separate query based on the ids from an initial select which is filtered and paginated. This has the following advantages:

- The view and list logic has clear separation.
- The initial select can leave pagination to the database.

Other ORM solutions include:

- (Lazily) loading each toMany relation for each task, causing [N+1](https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem-in-orm-object-relational-mapping) queries and poor performance (N is the number of tasks and 1 being the initial query).
- (Eagerly) joining the tags table. Pagination can no longer be done with limit and offset because they will refer to rows of tag-task combinations instead of just tasks. You can also only do this once or you'll run into [other problems](https://stackoverflow.com/q/4334970/728602).

## All Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## Exploring the Datbase

The `docker-compose.yml` file that runs the Postgres database is from https://github.com/khezen/compose-postgres so you can follow the instructions from [Access to PgAdmin](https://github.com/khezen/compose-postgres).

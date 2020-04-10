import { Pool } from "pg";

export const pool = new Pool({
	host: "localhost",
	database: "app",
	user: "postgres",
	password: "changeme",
	port: 5432,
});

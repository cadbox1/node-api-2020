import { pool } from ".";
import { PoolClient } from "pg";

export type TransactionFunction = (client: PoolClient) => Promise<any>;

export type TransactionHelper = (
	wrappedFunction: TransactionFunction
) => Promise<any>;

export const transactionHelper: TransactionHelper = async (
	wrappedFunction: TransactionFunction
) => {
	const client = await pool.connect();
	console.log("not mocked");
	try {
		await client.query("BEGIN");
		await wrappedFunction(client);
		await client.query("COMMIT");
	} catch (e) {
		await client.query("ROLLBACK");
		throw e;
	} finally {
		client.release();
	}
};

import { PoolClient } from "pg";
import { pool } from "../../db";
import { mocked } from "ts-jest/utils";

import {
	transactionHelper,
	TransactionFunction,
} from "../../db/transaction-helper";

const mockTransactionHelper = mocked(transactionHelper, true);

if (!mockTransactionHelper.mock) {
	throw new Error("Transaction helper has not been mocked.");
}

export const testTransactionHelper = async (
	test: (client: PoolClient) => Promise<any>
) => {
	const client = await pool.connect();

	mockTransactionHelper.mockImplementation(
		(wrappedFunction: TransactionFunction) => {
			return wrappedFunction(client);
		}
	);

	try {
		await client.query("BEGIN");
		await test(client);
		await client.query("ROLLBACK");
	} catch (e) {
		await client.query("ROLLBACK");
		throw e;
	} finally {
		client.release();
	}
};

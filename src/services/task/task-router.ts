import express from "express";
import { transactionHelper } from "../../db/transaction-helper";

const router = express.Router();

// @ts-ignore
router.get("/", async (req, res) => {
	transactionHelper(async client => {
		await client.query("INSERT INTO task (name) VALUES ('something')");
		const { rows } = await client.query("SELECT * FROM task");
		res.send(rows);
	});
});

export { router as taskRouter };

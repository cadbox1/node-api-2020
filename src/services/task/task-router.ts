import express from "express";
import { transactionHelper } from "../../db/transaction-helper";

const router = express.Router();

router.get("/", async (req, res) => {
	const { page = 1, maxResults = 5 } = req.query;

	const limit = Number(maxResults);
	const offset = (Number(page) - 1) * Number(maxResults);

	transactionHelper(async client => {
		const { rows: taskRows } = await client.query(
			`SELECT * 
			FROM task t
			ORDER BY t.id
			LIMIT $1 OFFSET $2`,
			[limit, offset]
		);

		const taskIds = taskRows.map((row: any) => row.id);

		const { rows: tagRows } = await client.query(
			`SELECT * 
			FROM tag t 
			INNER JOIN task_tag tt on tt.tag_id = t.id
			where tt.task_id = ANY ($1)
			ORDER BY t.name`,
			[taskIds]
		);

		const tasks = taskRows.map(task => {
			const taskTags = tagRows.filter(tagRow => tagRow.task_id === task.id);
			console.log(task.id);
			console.log(taskTags);
			return {
				...task,
				tags: taskTags,
			};
		});

		res.send(tasks);
	});
});

router.post("/", async (req, res) => {
	const { name } = req.body;

	transactionHelper(async client => {
		const {
			rows,
		} = await client.query("INSERT INTO task(name) VALUES ($1) RETURNING *", [
			name,
		]);
		res.send(rows[0]);
	});
});

export { router as taskRouter };

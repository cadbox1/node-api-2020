import request from "supertest";
import { testTransactionHelper } from "../../common/test-helpers/test-transaction-helper";
import app from "../../app";

describe("GET /task", () => {
	it("should return 200 OK and return 5 results", async () => {
		await testTransactionHelper(client =>
			request(app)
				.get("/task")
				.expect(200)
				.then(response => {
					expect(response.body.length).toBe(5);
				})
		);
	});

	it("should return 200 OK for page 2 and return 1 result with tags", async () => {
		await testTransactionHelper(client =>
			request(app)
				.get("/task?page=2&maxResults=4")
				.expect(200)
				.then(response => {
					expect(response.body.length).toBe(1);
					expect(response.body[0]).toHaveProperty("id", 5);
					expect(response.body[0]).toHaveProperty("tags");
					expect(response.body[0].tags).toHaveLength(2);
				})
		);
	});
});

describe("POST /task", () => {
	it("should return 200 OK, write to the database and return the new task", async () => {
		const name = "testing new task";

		await testTransactionHelper(async client => {
			await request(app)
				.post("/task")
				.send({ name })
				.expect(200)
				.then(response => {
					expect(response.body.id).toBeDefined();
					expect(response.body.name).toBe(name);
				});

			const { rows } = await client.query(
				"SELECT * FROM task where name = $1",
				[name]
			);
			expect(rows).toHaveLength(1);
		});
	});
});

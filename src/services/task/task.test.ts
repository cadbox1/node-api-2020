import request from "supertest";
import { testTransactionHelper } from "../../common/test-helpers/test-transaction-helper";
import app from "../../app";

describe("GET /task", () => {
	it("should return 200 OK", async () => {
		await testTransactionHelper(client =>
			request(app)
				.get("/task")
				.expect(200)
		);
	});
});

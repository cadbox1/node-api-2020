import express from "express";
import { taskRouter } from "./services/task/task-router";

const app = express();

app.set("port", process.env.PORT || 3000);

app.use("/task", taskRouter);

// @ts-ignore
app.get("/", async (req, res) => {
	res.send("Hello world");
});

export default app;

import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);

// @ts-ignore
app.get("/", async (req, res) => {
	res.send("Hello world");
});

export default app;

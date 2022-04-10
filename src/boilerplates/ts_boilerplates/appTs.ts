const appTs = `import express from "express";
import apiRouter from "./api/routes/index.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (_req, res) => {
  res.send("<h1>let's code!</h1>");
});
app.use("/api", apiRouter);

export default app;
`;

export default appTs;

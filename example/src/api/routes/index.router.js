const { Router } = require("express");
const indexController = require("../controller/index.controller");
const apiRouter = Router();

apiRouter.get("/", indexController);

module.exports = apiRouter;

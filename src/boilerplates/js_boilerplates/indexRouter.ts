const indexRouter = `const { Router } = require("express");
const indexController = require("../controllers/index.controller");
const apiRouter = Router();

apiRouter.get("/", indexController);

module.exports = apiRouter;
`;

export default indexRouter;

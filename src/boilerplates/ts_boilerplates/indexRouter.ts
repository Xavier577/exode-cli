const indexRouter = `import { Router } from "express";
import indexController from "../controllers/index.controller";

const apiRouter = Router();

apiRouter.get("/", indexController);

export default apiRouter;
`;

export default indexRouter;

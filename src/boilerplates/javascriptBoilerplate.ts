export const indexJs = `const http = require("http");
const app = require("./app");
const server = http.createServer(app); 

const PORT = process.env.PORT || 8080; 

process.env.NODE_ENV !== "production" && server.on("listening",() => {
    console.log(\`http://localhost:\${PORT}\`);
})

server.listen(PORT);
`;

export const appJs = `const express = require("express");
const app = express();

app.get("/",(_req,res) => {
            res.send("<h2>Let's code!</h2>");
});

module.exports = app;
`;

export const indexController = `async function index(req,res,next){
    res.send("<h1>Hello there, let's code</h1>");
};

module.exports = index;
`;
export const indexRouter = `const { Router } = require("express");
const indexController = require("../controller/index.controller");
const apiRouter = Router();

apiRouter.get("/", indexController);

module.exports = apiRouter;
`;

export const asyncWrapper = `async function AsyncWrapper(func) {
    try {
        let result = await func();
        return [result, undefined];
    } catch (error) {
        return [undefined, error];
    }
}

module.exports = AsyncWrapper;
`;

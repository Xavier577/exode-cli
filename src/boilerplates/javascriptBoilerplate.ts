export const indexJsFileBoilerplate = `const http = require("http");
const app = require("./app");
const server = http.createServer(app); 

const PORT = process.env.PORT || 8080; 

process.env.NODE_ENV !== "production" && server.on("listening",() => {
    console.log(\`http://localhost:\${PORT}\`);
})

server.listen(PORT);

`;

export const appJsFileBoilerplate = `const express = require("express");
const app = express();

app.get("/",(_req,res) => {
            res.send("<h2>Let's code!</h2>");
})

module.exports = app;
`;

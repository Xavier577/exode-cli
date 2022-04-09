const appJs = `const express = require("express");
const app = express();

app.get("/",(_req,res) => {
            res.send("<h2>Let's code!</h2>");
});

module.exports = app;
`;

export default appJs;

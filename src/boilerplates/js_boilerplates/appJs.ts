const appJs = `const express = require("express");
const cors = require("cors");

const app = express();
const apiRoutes = require("./api/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api",apiRoutes)

app.get("/",(_req,res) => {
            res.send("<h2>Let's code!</h2>");
});

module.exports = app;
`;

export default appJs;

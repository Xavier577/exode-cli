const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";

export const indexJsFileBoilerplate = `const express = require("express");
const app = express()

const PORT = ${PORT}; 
const hostname = "${hostname}"

app.get("/", (_req,res) => {
             res.send("<h2>Let's code!</h2>")
})

app.listen(PORT,hostname, () => console.log("listening on http://${hostname}:${PORT}"))

`;

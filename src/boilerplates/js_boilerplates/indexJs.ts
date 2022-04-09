const indexJs = `const http = require("http");
const app = require("./app");

const server = http.createServer(app); 
const PORT = process.env.PORT || 8080; 

process.env.NODE_ENV !== "production" && server.on("listening",() => {
    console.log(\`http://localhost:\${PORT}\`);
})

server.listen(PORT);
`;

export default indexJs;

export const indexTsFileBoilerplate = `import http from "http";
import app from "./app";

const server = http.createServer(app)
const PORT = process.env.PORT || 8080; 

process.env.NODE_ENV !== "production" && server.on("listening", () => {
  console.log(\`listening on http://localhost:\${PORT}\`);
})

server.listen(PORT);
`;

export const appTSFileBoilerplate = `import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("<h1>let's code!</h1>");
});

export default app;
`;

export const tsconfigBoilerplate = `{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
    "skipLibCheck": true,
    "sourceMap": true,
    "outDir": "./dist",
    "moduleResolution": "node",
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "baseUrl": "."
  },
  "exclude": ["node_modules"],
  "include": ["./src/**/*.ts"]
}
`;

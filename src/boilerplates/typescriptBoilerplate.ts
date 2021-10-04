const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";

export const indexTsFileBoilerplate = `
import express from "express";
const app = express()

const PORT = ${PORT}; 
const hostname = "${hostname}"

app.get("/", (_req,res) => {
             res.send("<h2>This project was created by excon</h2>")
})

app.listen(PORT,hostname, () => console.log("listening on http://${hostname}:${PORT}"))
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

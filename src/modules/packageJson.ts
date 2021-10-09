const packgeJson = (projectName: string, type: "js" | "ts" = "ts") => {
  return type === "js"
    ? `{
     "name": "${projectName}",
     "version": "0.0.1",
     "main": "index.js",
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }
   `
    : `{
     "name": "${projectName}",
     "version": "0.0.1",
     "main": "index.js",
     "scripts": {
       "start": "node dist/index.js",
       "build": "tsc",
       "dev": "nodemon --exec ts-node ./src/index.ts --mode development"
     }
   }
   `;
};

export default packgeJson;

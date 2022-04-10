import CreateExodeJs from "./create-express-javascript";
import path from "path";
import gitIgnoreBoilerplate from "../boilerplates/others/gitIgnoreBoilerplate";
import {
    appTs,
    indexTs,
    indexController,
    indexRouter,
    asyncWrapper,
    promiseWrapper,
    tsconfig,
} from "../boilerplates/ts_boilerplates";

export default class CreateExodeTs extends CreateExodeJs {
    protected static setDependencyInstallCmd() {
        this.dependencyInstallCommand = `cd ${this.projectDir} && npx yarn add express cors dotenv && npx yarn add -D nodemon @types/node @types/express @types/cors typescript ts-node`;
    }
    protected static setProjectFolderStructure() {
        const src = path.join(this.projectDir, "src");
        this.folders = {
            src,
            tests: path.join(src, "tests"),
            types: path.join(src, "types"),
            config: path.join(src, "config"),
            helpers: path.join(src, "helpers"),
            api: path.join(src, "api"),
            routes: path.join(src, "api", "routes"),
            controllers: path.join(src, "api", "controllers"),
            models: path.join(src, "api", "models"),
            middlewares: path.join(src, "api", "middlewares"),
            services: path.join(src, "api", "services"),
        };
        this.files = {
            dotEnv: {
                dir: path.join(this.projectDir, ".env"),
                boilerplate: "",
            },
            gitIgnore: {
                dir: path.join(this.projectDir, ".gitignore"),
                boilerplate: gitIgnoreBoilerplate,
            },
            packageJson: {
                dir: path.join(this.projectDir, "package.json"),
                boilerplate: CreateExodeTs.makePackageJson(),
            },
            tsConfig: {
                dir: path.join(this.projectDir, "tsconfig.json"),
                boilerplate: tsconfig,
            },
            indexJs: {
                dir: path.join(this.folders.src, "index.ts"),
                boilerplate: indexTs,
            },
            appJs: {
                dir: path.join(this.folders.src, "app.ts"),
                boilerplate: appTs,
            },
            indexRouter: {
                dir: path.join(this.folders.routes, "index.router.ts"),
                boilerplate: indexRouter,
            },
            indexController: {
                dir: path.join(this.folders.controllers, "index.controller.ts"),
                boilerplate: indexController,
            },
            asyncWrapper: {
                dir: path.join(this.folders.helpers, "async-wrapper.ts "),
                boilerplate: asyncWrapper,
            },
            promiseWrapper: {
                dir: path.join(this.folders.helpers, "promise-wrapper.ts"),
                boilerplate: promiseWrapper,
            },
        };
    }

    protected static makePackageJson() {
        return `{
     "name": "${this.projectName}",
     "version": "0.0.1",
     "main": "index.js",
     "scripts": {
       "start": "node dist/index.js",
       "build": "tsc",
       "dev": "nodemon --exec ts-node ./src/index.ts --mode development"
     }
   }
   `;
    }
}

import chalk from "chalk";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import ora, { Color } from "ora";
import { SyncErrorProneFnWrapper } from "../utils/synchronous-error-prone-wrapper";
import {
    indexJs,
    appJs,
    indexRouter,
    indexController,
    promiseWrapper,
    asyncWrapper,
} from "../boilerplates/js_boilerplates";
import { execSync } from "child_process";
import gitIgnoreBoilerplate from "../boilerplates/others/gitIgnoreBoilerplate";

export default class CreateExodeJs {
    protected static projectName: string;
    protected static projectDir: string;
    protected static dependencyInstallCommand: string;
    protected static files: {
        [name: string]: { dir: string; boilerplate: string };
    };
    protected static folders: { [name: string]: string };
    protected static CLI_SUCCESS_MESSAGE = "Happy Hacking!";
    protected static allPathChar = ["*", ".", "./"];
    protected static spinnerColors: Color[] = ["blue", "yellow", "green"];
    protected static spinnerColorsLength = CreateExodeJs.spinnerColors.length;

    public static run() {
        CreateExodeJs.makeRootDir();
        CreateExodeJs.makeProjectFolders();
        CreateExodeJs.makeProjectFiles();
        CreateExodeJs.installDependencies();
    }

    protected static randomColor() {
        const lastElemIdx = CreateExodeJs.spinnerColors.length - 1;
        const randomIndex = lastElemIdx * Math.random();
        return CreateExodeJs.spinnerColors[randomIndex];
    }

    protected static runBetweenSpinner(message: string) {
        return (
            _target: any,
            _property: string,
            descriptor: TypedPropertyDescriptor<any>
        ) => {
            const originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
                const currentSpinner = ora(message).start();
                currentSpinner.color = CreateExodeJs.randomColor();
                originalMethod.apply(this, args);
                currentSpinner.succeed();
            };
        };
    }

    public static setProjectProps(projectName: string) {
        CreateExodeJs.projectName = CreateExodeJs.allPathChar.includes(
            projectName
        )
            ? path.basename(path.resolve())
            : projectName;
        CreateExodeJs.projectDir = CreateExodeJs.allPathChar.includes(
            projectName
        )
            ? process.cwd()
            : path.join(process.cwd(), projectName);
        CreateExodeJs.dependencyInstallCommand = `cd ${CreateExodeJs.projectDir} && npx yarn add express cors dotenv && npx yarn add -D nodemon`;
        CreateExodeJs.setProjectFolderStructure();
    }

    protected static setProjectFolderStructure() {
        const src = path.join(CreateExodeJs.projectDir, "src");
        CreateExodeJs.folders = {
            src,
            tests: path.join(src, "tests"),
            config: path.join(src, "config"),
            helpers: path.join(src, "helpers"),
            api: path.join(src, "api"),
            routes: path.join(src, "api", "routes"),
            controllers: path.join(src, "api", "controllers"),
            models: path.join(src, "api", "models"),
            middlewares: path.join(src, "api", "middlewares"),
            services: path.join(src, "api", "services"),
        };
        CreateExodeJs.files = {
            dotEnv: {
                dir: path.join(CreateExodeJs.projectDir, ".env"),
                boilerplate: "",
            },
            gitIgnore: {
                dir: path.join(CreateExodeJs.projectDir, ".gitignore"),
                boilerplate: gitIgnoreBoilerplate,
            },
            packageJson: {
                dir: path.join(CreateExodeJs.projectDir, "package.json"),
                boilerplate: CreateExodeJs.makePackageJson(),
            },
            indexJs: {
                dir: path.join(CreateExodeJs.folders.src, "index.js"),
                boilerplate: indexJs,
            },
            appJs: {
                dir: path.join(CreateExodeJs.folders.src, "app.js"),
                boilerplate: appJs,
            },
            indexRouter: {
                dir: path.join(CreateExodeJs.folders.routes, "index.router.js"),
                boilerplate: indexRouter,
            },
            indexController: {
                dir: path.join(
                    CreateExodeJs.folders.controllers,
                    "index.controller.js"
                ),
                boilerplate: indexController,
            },
            asyncWrapper: {
                dir: path.join(
                    CreateExodeJs.folders.helpers,
                    "async-wrapper.js "
                ),
                boilerplate: asyncWrapper,
            },
            promiseWrapper: {
                dir: path.join(
                    CreateExodeJs.folders.helpers,
                    "promise-wrapper.js"
                ),
                boilerplate: promiseWrapper,
            },
        };
    }

    @CreateExodeJs.runBetweenSpinner("creating root dir")
    protected static makeRootDir() {
        const [_, error] = SyncErrorProneFnWrapper(() =>
            mkdirSync(CreateExodeJs.projectDir)
        );

        if (error?.code == "EEXIST") {
            const errMessage = chalk.redBright(
                `${CreateExodeJs.projectName} already Exists`
            );
            console.error(errMessage);
            process.exit(1);
        }

        if (error) {
            console.error(error);
            process.exit(1);
        }
    }

    protected static makePackageJson() {
        return `{
     "name": "${CreateExodeJs.projectName}",
     "version": "0.0.1",
     "main": "index.js",
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }`;
    }

    @CreateExodeJs.runBetweenSpinner("Creating folders")
    protected static makeProjectFolders() {
        for (let folderName in CreateExodeJs.folders) {
            const [_, error] = SyncErrorProneFnWrapper(() =>
                mkdirSync(CreateExodeJs.folders[folderName])
            );
            if (error) {
                console.error(chalk.redBright(error));
            }
        }
    }

    @CreateExodeJs.runBetweenSpinner("Creating files")
    protected static makeProjectFiles() {
        for (let fileName in CreateExodeJs.files) {
            const file = CreateExodeJs.files[fileName];
            const [_, error] = SyncErrorProneFnWrapper(() =>
                writeFileSync(file.dir, file.boilerplate)
            );
            if (error) {
                console.error(chalk.redBright(error));
            }
        }
    }

    @CreateExodeJs.runBetweenSpinner("Installing depencies")
    protected static installDependencies() {
        const [_, error] = SyncErrorProneFnWrapper(() =>
            execSync(CreateExodeJs.dependencyInstallCommand)
        );
        if (error) console.error(chalk.redBright(error));
    }
}

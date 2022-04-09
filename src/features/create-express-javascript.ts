import chalk from "chalk";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { Ora, promise as OraPromise } from "ora";
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
    protected static inCwd = false;
    protected static dependencyInstallCommand: string;
    protected static files: {
        [name: string]: { dir: string; boilerplate: string };
    };
    protected static folders: { [name: string]: string };
    protected static CLI_SUCCESS_MESSAGE = "Happy Hacking!";
    protected static allPathChar = ["*", ".", "./"];
    protected static globalSpinner: Ora;

    public static async run() {
        !CreateExodeJs.inCwd && (await CreateExodeJs.makeRootDir());
        await CreateExodeJs.makeProjectFolders();
        await CreateExodeJs.makeProjectFiles();
        await CreateExodeJs.installDependencies();
        CreateExodeJs.end();
    }

    protected static runBetweenSpinner(message: string) {
        return (
            _target: any,
            _property: string,
            descriptor: TypedPropertyDescriptor<any>
        ) => {
            const originalMethod = descriptor.value;

            descriptor.value = async function (...args: any[]) {
                const spinner = OraPromise(originalMethod.apply(this, args), {
                    color: "blue",
                    text: message,
                }).start();
                CreateExodeJs.globalSpinner = spinner;
            };
        };
    }

    public static setProjectProps(projectName: string) {
        CreateExodeJs.inCwd = CreateExodeJs.allPathChar.includes(projectName);
        CreateExodeJs.projectName = CreateExodeJs.inCwd
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

    @CreateExodeJs.runBetweenSpinner("creating root dir")
    protected static async makeRootDir() {
        const [_, error] = SyncErrorProneFnWrapper(() =>
            mkdirSync(CreateExodeJs.projectDir)
        );

        if (error?.code == "EEXIST") {
            const errMessage = chalk.redBright(
                `${CreateExodeJs.projectName} already Exists`
            );
            CreateExodeJs.globalSpinner.text = errMessage;
            CreateExodeJs.globalSpinner.fail();
            process.exit(1);
        }

        if (error) {
            console.error(error);
            process.exit(1);
        }
    }

    @CreateExodeJs.runBetweenSpinner("Creating folders")
    protected static async makeProjectFolders() {
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
    protected static async makeProjectFiles() {
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

    @CreateExodeJs.runBetweenSpinner("Installing dependencies")
    protected static async installDependencies() {
        const [_, error] = SyncErrorProneFnWrapper(() => {
            execSync(CreateExodeJs.dependencyInstallCommand);
        });
        if (error) console.error(chalk.redBright(error));
    }

    protected static end() {
        console.log(chalk.blueBright(CreateExodeJs.CLI_SUCCESS_MESSAGE));
    }
}

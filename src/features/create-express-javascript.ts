import chalk from "chalk";
import path from "path";
import PromiseWrapper from "../utils/promise-wrapper";
import {
    asyncExec,
    asyncMkdir,
    asyncWriteFile,
} from "../utils/promisified-utils";
import {
    indexJs,
    appJs,
    indexRouter,
    indexController,
    promiseWrapper,
    asyncWrapper,
} from "../boilerplates/js_boilerplates";
import gitIgnoreBoilerplate from "../boilerplates/others/gitIgnoreBoilerplate";
import Spinner from "./spinner";

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

    public static async run() {
        await this.makeRootDir((isDone) => {
            if (isDone) Spinner.done();
        });
        await this.makeProjectFolders((isDone) => {
            if (isDone) Spinner.done();
        });
        await this.makeProjectFiles((isDone) => {
            if (isDone) Spinner.done();
        });
        await this.installDependencies((isDone) => {
            if (isDone) {
                Spinner.done();
                this.end();
            }
        });
    }

    public static setProjectProps(projectName: string) {
        this.inCwd = this.allPathChar.includes(projectName);
        this.projectName = this.inCwd
            ? path.basename(path.resolve())
            : projectName;
        this.projectDir = this.allPathChar.includes(projectName)
            ? process.cwd()
            : path.join(process.cwd(), projectName);
        this.setDependencyInstallCmd();
        this.setProjectFolderStructure();
    }

    protected static setDependencyInstallCmd() {
        this.dependencyInstallCommand = `cd ${this.projectDir} && npx yarn add express cors dotenv && npx yarn add -D nodemon`;
    }

    protected static setProjectFolderStructure() {
        const src = path.join(this.projectDir, "src");
        this.folders = {
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
                boilerplate: this.makePackageJson(),
            },
            indexJs: {
                dir: path.join(this.folders.src, "index.js"),
                boilerplate: indexJs,
            },
            appJs: {
                dir: path.join(this.folders.src, "app.js"),
                boilerplate: appJs,
            },
            indexRouter: {
                dir: path.join(this.folders.routes, "index.router.js"),
                boilerplate: indexRouter,
            },
            indexController: {
                dir: path.join(this.folders.controllers, "index.controller.js"),
                boilerplate: indexController,
            },
            asyncWrapper: {
                dir: path.join(this.folders.helpers, "async-wrapper.js "),
                boilerplate: asyncWrapper,
            },
            promiseWrapper: {
                dir: path.join(this.folders.helpers, "promise-wrapper.js"),
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
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }`;
    }

    @Spinner.load({ text: "Creating root dir..." })
    protected static async makeRootDir(done?: (isDone: boolean) => void) {
        if (this.inCwd) return done?.(true);

        const [_, error] = await PromiseWrapper(asyncMkdir(this.projectDir));
        if (error?.code == "EEXIST") {
            const errMessage = chalk.redBright(
                `${this.projectName} already Exists`
            );
            Spinner.fail(errMessage);
            done?.(false);
            process.exit(1);
        }

        if (error) {
            Spinner.fail("An unexpected error occurred");
            console.error(error);
            done?.(false);
            process.exit(1);
        }

        done?.(true);
    }

    @Spinner.load({ text: "Creating project folders" })
    protected static async makeProjectFolders(
        done?: (isDone: boolean) => void
    ) {
        for (let folderName in this.folders) {
            const [_, error] = await PromiseWrapper(
                asyncMkdir(this.folders[folderName])
            );
            if (error) {
                done?.(false);
                console.error(chalk.redBright(error));
                process.exit(1);
            }
        }
        done?.(true);
    }

    @Spinner.load({ text: "Creating Project files" })
    protected static async makeProjectFiles(done?: (isDone: boolean) => void) {
        for (let fileName in this.files) {
            const file = this.files[fileName];
            const [_, error] = await PromiseWrapper(
                asyncWriteFile(file.dir, file.boilerplate)
            );
            if (error) {
                done?.(false);
                console.error(chalk.redBright(error));
                process.exit(1);
            }
        }
        done?.(true);
    }

    @Spinner.load({ text: "Installing dependencies" })
    protected static async installDependencies(
        done?: (isDone?: boolean) => void
    ) {
        const [_, error] = await PromiseWrapper(
            asyncExec(this.dependencyInstallCommand)
        );
        if (error) {
            done?.(false);
            Spinner.fail();
            console.error(chalk.redBright(error));
            process.exit(1);
        }
        done?.(true);
    }

    protected static end() {
        Spinner.stop();
        console.log(chalk.blueBright(this.CLI_SUCCESS_MESSAGE));
    }
}

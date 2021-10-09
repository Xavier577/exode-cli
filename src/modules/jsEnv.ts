import { execSync } from "child_process";
import path from "path";
import { mkdirSync, writeFileSync } from "fs";
import packgeJson from "./packageJson";
import { indexJsFileBoilerplate } from "../boilerplates/javascriptBoilerplate";
import chalk from "chalk";

const jsEnv = (projectName: string, projectDir: string) => {
  const INDEX_JS = path.join(projectDir, "src", "index.js");
  const INSTALL_COMMAND = `cd ${projectDir} && npx yarn add express && npx yarn add -D nodemon`;
  const PACKAGE_JSON = path.join(projectDir, "package.json");
  const SRC = path.join(projectDir, "src");
  const SUCESS_MESSAGE = chalk.blueBright("Happy Hacking!");

  writeFileSync(PACKAGE_JSON, packgeJson(projectName, "js"));

  mkdirSync(SRC);

  writeFileSync(INDEX_JS, indexJsFileBoilerplate);

  try {
    execSync(INSTALL_COMMAND);
    process.nextTick(() => console.log(SUCESS_MESSAGE));
  } catch (error) {
    console.error(chalk.redBright(error));
  }
};

export default jsEnv;

/* 

func startproject:
  
if project name argument is "." or "./":
set project name as name of current folder

else:
use the projectName argument as the project name
mkdir projectName


add gitIgnore file

if project type is javascript:
set up javascript environment:
    create base package.json
    create src folder
    create index.js in src folder
    install all dependencies

if project type is typescript:
set up typescript environment:
    create base package.json file
    create tsconfig.json file
    create src folder
    create index.ts file in src folder
    install all dependencies


*/

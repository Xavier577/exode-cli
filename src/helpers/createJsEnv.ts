import chalk from "chalk";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { indexJsFileBoilerplate } from "../boilerplates/javascriptBoilerplate";
import writePackgeJson from "./writePackageJson";

const createJsEnv = (projectName: string) => {
  const currentDir = process.cwd();
  const PACKAGE_JSON = path.join(currentDir, projectName, "package.json");
  const SRC = path.join(currentDir, projectName, "src");
  const INDEX_JS = path.join(currentDir, projectName, "src", "index.js");
  const INSTALL_COMMAND = `cd ${projectName} && npx yarn add express && npx yarn add -D nodemon`;
  const SUCESS_MESSAGE = chalk.blueBright("Happy Hacking!");

  writeFileSync(PACKAGE_JSON, writePackgeJson(projectName, "js"));
  mkdirSync(SRC);
  writeFileSync(INDEX_JS, indexJsFileBoilerplate);

  try {
    execSync(INSTALL_COMMAND);
    process.nextTick(() => console.log(SUCESS_MESSAGE));
  } catch (error) {
    console.error(chalk.redBright(error));
  }
};

export default createJsEnv;

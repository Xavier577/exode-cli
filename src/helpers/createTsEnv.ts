import path from "path";
import chalk from "chalk";
import writePackgeJson from "./writePackageJson";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import {
  tsconfigBoilerplate,
  indexTsFileBoilerplate,
} from "../boilerplates/typescriptBoilerplate";

const createTsEnv = (projectName: string) => {
  const currentDir = process.cwd();
  const PACKAGE_JSON = path.join(currentDir, projectName, "package.json");
  const TSCONFIG = path.join(currentDir, projectName, "tsconfig.json");
  const SRC = path.join(currentDir, projectName, "src");
  const INDEX_TS = path.join(currentDir, projectName, "src", "index.ts");
  const INSTALL_COMMAND = `cd ${projectName} && npx yarn add express && npx yarn add -D typescript ts-node nodemon @types/node @types/express`;
  const SUCESS_MESSAGE = chalk.blueBright("Happy Hacking!");

  writeFileSync(PACKAGE_JSON, writePackgeJson(projectName, "ts"));

  mkdirSync(SRC);
  writeFileSync(INDEX_TS, indexTsFileBoilerplate);
  writeFileSync(TSCONFIG, tsconfigBoilerplate);

  try {
    execSync(INSTALL_COMMAND);
    process.nextTick(() => console.log(SUCESS_MESSAGE));
  } catch (error) {
    console.error(chalk.redBright(error));
  }
};

export default createTsEnv;

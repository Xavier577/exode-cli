import chalk from "chalk";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import packgeJson from "./packageJson";
import {
  indexTsFileBoilerplate,
  tsconfigBoilerplate,
} from "../boilerplates/typescriptBoilerplate";

const tsEnv = (projectName: string, projectDir: string) => {
  const INDEX_TS = path.join(projectDir, "src", "index.ts");
  const INSTALL_COMMAND = `cd ${projectDir} && npx yarn add express && npx yarn add -D typescript ts-node nodemon @types/node @types/express`;
  const PACKAGE_JSON = path.join(projectDir, "package.json");
  const SRC = path.join(projectDir, "src");
  const SUCESS_MESSAGE = chalk.blueBright("Happy Hacking!");
  const TSCONFIG = path.join(projectDir, "tsconfig.json");

  writeFileSync(PACKAGE_JSON, packgeJson(projectName, "ts"));
  writeFileSync(TSCONFIG, tsconfigBoilerplate);

  mkdirSync(SRC);
  writeFileSync(INDEX_TS, indexTsFileBoilerplate);

  try {
    execSync(INSTALL_COMMAND);
    process.nextTick(() => console.log(SUCESS_MESSAGE));
  } catch (error) {
    console.error(chalk.redBright(error));
  }
};

export default tsEnv;

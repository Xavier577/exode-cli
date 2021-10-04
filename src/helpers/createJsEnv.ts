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

  writeFileSync(PACKAGE_JSON, writePackgeJson(projectName, "js"));

  execSync(
    `cd ${projectName} && npx yarn add express && npx yarn add -D nodemon`
  );

  mkdirSync(SRC);
  writeFileSync(INDEX_JS, indexJsFileBoilerplate);

  process.nextTick(() => console.log(chalk.blueBright("Happy hacking!")));
};

export default createJsEnv;

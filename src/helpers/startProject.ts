import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import writePackgeJson from "./writePackageJson";
import {
  indexTsFileBoilerplate,
  tsconfigBoilerplate,
} from "../boilerplates/typescriptBoilerplate";
import { indexJsFileBoilerplate } from "../boilerplates/javascriptBoilerplate";
import chalk from "chalk";

const startProject = (projectName: string, type: "js" | "ts" = "ts") => {
  const currentDir = process.cwd();
  try {
    mkdirSync(path.join(currentDir, projectName));
  } catch (error: any) {
    if (error.code == "EEXIST") {
      console.error(chalk.redBright(`${projectName} already exist`));
      process.exit();
    } else {
      console.error(error);
      process.exit();
    }
  }

  console.log(chalk.yellowBright("creating project..."));

  if (type === "js") {
    writeFileSync(
      path.join(currentDir, projectName, "package.json"),
      writePackgeJson(projectName, "js")
    );

    execSync(
      `cd ${projectName} && npx yarn add express && npx yarn add -D nodemon`
    );

    mkdirSync(path.join(currentDir, projectName, "src"));
    writeFileSync(
      path.join(currentDir, projectName, "src", "index.js"),
      indexJsFileBoilerplate
    );

    process.nextTick(() => console.log(chalk.blue("Happy hacking!")));
  } else if (type === "ts") {
    writeFileSync(
      path.join(currentDir, projectName, "package.json"),
      writePackgeJson(projectName, "ts")
    );

    execSync(
      `cd ${projectName} && npx yarn add express && npx yarn add -D typescript ts-node nodemon @types/node @types/express`
    );

    writeFileSync(
      path.join(currentDir, projectName, "tsconfig.json"),
      tsconfigBoilerplate
    );
    mkdirSync(path.join(currentDir, projectName, "src"));
    writeFileSync(
      path.join(currentDir, projectName, "src", "index.ts"),
      indexTsFileBoilerplate
    );

    process.nextTick(() => console.log(chalk.blue("Happy hacking!")));
  }
};

export default startProject;

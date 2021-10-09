import chalk from "chalk";
import path from "path";
import addGitIgnore from "./addGitIgnore";
import jsEnv from "./jsEnv";
import mkProjectDIr from "./mkProjectDir";
import tsEnv from "./tsEnv";

const projectStart = (projectNameArg: string, type: "js" | "ts" = "ts") => {
  let projectName: string;
  let projectDir: string;

  if (projectNameArg === "." || projectNameArg === "./") {
    projectName = path.basename(path.resolve());
    projectDir = process.cwd();
  } else {
    projectName = projectNameArg;
    projectDir = path.join(process.cwd(), projectName);
    mkProjectDIr(projectName);
  }

  console.log(chalk.yellowBright("setting up project...."));

  addGitIgnore(projectDir);

  type === "js"
    ? jsEnv(projectName, projectDir)
    : tsEnv(projectName, projectDir);
};

export default projectStart;

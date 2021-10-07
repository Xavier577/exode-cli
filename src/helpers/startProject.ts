import chalk from "chalk";
import createProjectDir from "./createProjectDir";
import createTsEnv from "./createTsEnv";
import createJsEnv from "./createJsEnv";
import addGitIgnore from "./addGitIgnore";

const startProject = (projectName: string, type: "js" | "ts" = "ts") => {
  createProjectDir(projectName);

  console.log(chalk.yellowBright("creating project..."));

  addGitIgnore(projectName);

  type === "js" ? createJsEnv(projectName) : createTsEnv(projectName);
};

export default startProject;

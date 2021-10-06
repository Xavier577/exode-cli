import chalk from "chalk";
import createProjectDir from "./createProjectDir";
import createTsEnv from "./createTsEnv";
import createJsEnv from "./createJsEnv";
import addGitIgnore from "./gitInit";

const startProject = (projectName: string, type: "js" | "ts" = "ts") => {
  createProjectDir(projectName);

  console.log(chalk.yellowBright("creating project..."));

  addGitIgnore(projectName);

  if (type === "js") {
    createJsEnv(projectName);
  } else if (type === "ts") {
    createTsEnv(projectName);
  }
};

export default startProject;

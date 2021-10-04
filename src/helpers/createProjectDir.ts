import chalk from "chalk";
import { mkdirSync } from "fs";
import path from "path";

const createProjectDir = (projectName: string) => {
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
};

export default createProjectDir;

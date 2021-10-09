import chalk from "chalk";
import { mkdirSync } from "fs";
import path from "path";

const mkProjectDIr = (dirname: string) => {
  const currentDir = process.cwd();

  try {
    mkdirSync(path.join(currentDir, dirname));
  } catch (error: any) {
    if (error.code == "EEXIST") {
      console.error(chalk.redBright(`${dirname} already exist`));
      process.exit();
    } else {
      console.error(error);
      process.exit();
    }
  }
};

export default mkProjectDIr;

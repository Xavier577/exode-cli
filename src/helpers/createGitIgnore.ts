import { writeFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import gitIgnoreBoilerplate from "../boilerplates/gitIgnoreBoilerplate";

const gitInit = (projectName: string) => {
  const currentDir = process.cwd();
  const GIT_IGNORE = path.join(currentDir, projectName, ".gitignore");

  try {
    execSync(`cd ${projectName} && npx git init`);
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }

  writeFileSync(GIT_IGNORE, gitIgnoreBoilerplate);
};
export default gitInit;

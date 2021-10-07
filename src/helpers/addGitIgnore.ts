import { writeFileSync } from "fs";
import path from "path";
import gitIgnoreBoilerplate from "../boilerplates/gitIgnoreBoilerplate";

const addGitIgnore = (projectName: string) => {
  const currentDir = process.cwd();
  const GIT_IGNORE = path.join(currentDir, projectName, ".gitignore");

  writeFileSync(GIT_IGNORE, gitIgnoreBoilerplate);
};
export default addGitIgnore;

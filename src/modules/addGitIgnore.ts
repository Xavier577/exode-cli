import { writeFileSync } from "fs";
import path from "path";
import gitIgnoreBoilerplate from "../boilerplates/gitIgnoreBoilerplate";

const addGitIgnore = (projectDir: string) => {
  const GIT_IGNORE = path.join(projectDir, ".gitignore");

  writeFileSync(GIT_IGNORE, gitIgnoreBoilerplate);
};
export default addGitIgnore;

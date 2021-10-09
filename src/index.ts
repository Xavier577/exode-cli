#!/usr/bin/env node
import { Command } from "commander";
import projectStart from "./modules/projectStart";

const program = new Command();
program.version("0.0.5");

program
  .command("init <projectname>")
  .option("-js, --javascript ", "javascript mode")
  .action((projectname, options) => {
    options.javascript
      ? projectStart(projectname, "js")
      : projectStart(projectname, "ts");
  });

program.parse();

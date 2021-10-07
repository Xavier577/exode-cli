#!/usr/bin/env node
import { Command } from "commander";
import startProject from "./helpers/startProject";

const program = new Command();
program.version("0.0.4");

program
  .command("init <projectname>")
  .option("-js, --javascript ", "add the specified type of cheese")
  .action((projectname, options) => {
    options.javascript
      ? startProject(projectname, "js")
      : startProject(projectname, "ts");
  });

program.parse();

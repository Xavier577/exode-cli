#!/usr/bin/env node
import { Command } from "commander";
import startProject from "./helpers/startProject";

const program = new Command();
program.version("0.0.1");

program
  .command("init <projectname>")
  .option("-js, --javascript ", "add the specified type of cheese")
  .action((projectname, options) => {
    if (options.javascript) {
      startProject(projectname, "js");
    } else {
      startProject(projectname, "ts");
    }
  });

program.parse();

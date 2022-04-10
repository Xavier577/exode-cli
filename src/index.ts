#!/usr/bin/env node
import { program } from "commander";
import ExodeCLI from "./main";
import CLIFeatures from "./features";
//@ts-ignore
import * as packageConfig from "../package.json";

ExodeCLI.run({
    version: packageConfig.version,
    program,
    cliFeatures: CLIFeatures.main,
});

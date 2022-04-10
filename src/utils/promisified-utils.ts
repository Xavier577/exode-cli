import { promisify } from "util";
import { mkdir, writeFile } from "fs";
import { exec } from "child_process";

export const asyncMkdir = promisify(mkdir);
export const asyncWriteFile = promisify(writeFile);
export const asyncExec = promisify(exec);

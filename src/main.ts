import { Command } from "commander";

interface IExodeArgs {
    program: Command;
    version: string;
    cliFeatures: (...args: any[]) => void;
}

export default class ExodeCLI {
    private static command = "init <projectname>";
    private static options =
        "-js, --javascript, create an express project with javascript";

    public static run({ program, version, cliFeatures }: IExodeArgs) {
        program.version(version);
        program
            .command(ExodeCLI.command)
            .option(ExodeCLI.options)
            .action(cliFeatures);
        program.parse();
    }
}

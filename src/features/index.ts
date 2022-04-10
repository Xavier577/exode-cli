import CreateExodeJs from "./create-express-javascript";
import CreateExodeTs from "./create-exress-typescript";

export default class CLIFeatures {
    public static main(projectName: any, options: any) {
        if (options.javascript) {
            CreateExodeJs.setProjectProps(projectName);
            CreateExodeJs.run();
        } else {
            CreateExodeTs.setProjectProps(projectName);
            CreateExodeTs.run();
        }
    }
}

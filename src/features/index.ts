import CreateExodeJs from "./create-express-javascript";
import CreateExodeTs from "./create-exress-typescript";

export default class CLIFeatures {
    public static main(projectName: any, options: any) {
        switch (options.javascript) {
            case true:
                CreateExodeJs.setProjectProps(projectName)
                CreateExodeJs.run()
                break
            default:
                CreateExodeTs.setProjectProps(projectName)
                CreateExodeTs.run()
        }
    }
}


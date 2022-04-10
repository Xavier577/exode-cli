import ora, { Options as OraOptions, Ora, Color } from "ora";

type Attribute = keyof OraOptions;

interface ISpinnerLoad {
    color?: Color;
    text?: string;
}

export default class Spinner {
    private static atrributes: OraOptions;
    private static spinner: Ora;

    public static spin(text?: string) {
        Spinner.spinner.start(text);
        return Spinner;
    }

    public static load({ color = "blue", text }: ISpinnerLoad) {
        return (
            _target: any,
            _property: string,
            descriptor: TypedPropertyDescriptor<any>
        ) => {
            const originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
                Spinner.setAttritutes({ color, text });
                Spinner.ready();
                Spinner.spin();
                return originalMethod.apply(this, args);
            };
        };
    }

    public static setAttritutes(attributes: OraOptions) {
        Spinner.atrributes = {
            ...Spinner.atrributes,
            ...attributes,
        };
    }

    public static ready() {
        Spinner.spinner = ora(Spinner.atrributes);
    }

    public static stop() {
        Spinner.spinner.stop();
        return Spinner;
    }

    public static done(text?: string) {
        Spinner.spinner.succeed(text);
        return Spinner;
    }

    public static fail(text?: string) {
        Spinner.spinner.fail(text);
        return Spinner;
    }

    public static getAttribute(atrribute: Attribute) {
        return Spinner.atrributes[atrribute];
    }
}

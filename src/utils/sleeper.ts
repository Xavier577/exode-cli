type VoidFn = (...args: any[]) => void;
type VoidAsynFn = (...args: any[]) => Promise<void>;
export default class Sleeper {
    private static previousTime = 0;
    private static currentTime = 0;
    private static time = 0;

    private static calibrateParams(duration: number) {
        Sleeper.currentTime = duration * 1000;
        Sleeper.time = Sleeper.currentTime + Sleeper.previousTime;
        Sleeper.previousTime += Sleeper.currentTime;
    }

    public static async fnExecSleep(fn: VoidFn, duration = 0.001) {
        Sleeper.calibrateParams(duration);
        await new Promise(() => setTimeout(fn, Sleeper.time));
        return Sleeper;
    }

    public static async execImmediate(fn: VoidFn) {
        await (async function () {
            return fn();
        })();
        return Sleeper;
    }

    public static async runSynchronously(asyncFns: VoidAsynFn[]) {
        for await (const asynFn of asyncFns) {
            await asynFn();
        }
    }

    public static async sleep(duration = 0.001) {
        Sleeper.calibrateParams(duration);
        await new Promise((res) => setTimeout(res, Sleeper.time));
        return Sleeper;
    }
}

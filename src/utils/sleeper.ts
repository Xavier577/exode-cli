export default class Sleeper {
    private static previousTime = 0;
    private static currentTime = 0;
    private static time = 0;

    public static async sleep(duration: number) {
        Sleeper.currentTime = duration * 1000;
        Sleeper.time = Sleeper.currentTime + Sleeper.previousTime;
        Sleeper.previousTime += Sleeper.currentTime;
        return new Promise((res) => setTimeout(res, Sleeper.time));
    }
}

export const { sleep } = Sleeper;

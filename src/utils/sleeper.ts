export default class Timer {
    private static previousTime = 0;
    private static currentTime = 0;
    private static time = 0;

    public static delay(fn: () => void, duration: number) {
        Timer.currentTime = duration * 1000;
        Timer.time = Timer.currentTime + Timer.previousTime;
        Timer.previousTime += Timer.currentTime;
        setTimeout(fn, Timer.time);
    }
}

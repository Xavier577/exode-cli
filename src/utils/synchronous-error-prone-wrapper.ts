export function SyncErrorProneFnWrapper<T>(
    func: () => T
): [T | undefined, any] {
    try {
        let result = func();
        return [result, undefined];
    } catch (error) {
        return [undefined, error];
    }
}


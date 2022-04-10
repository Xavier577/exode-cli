export default async function PromiseWrapper<T>(
    promise: Promise<T>
): Promise<[T | undefined, any]> {
    try {
        let result = await promise;
        return [result, undefined];
    } catch (error) {
        return [undefined, error];
    }
}

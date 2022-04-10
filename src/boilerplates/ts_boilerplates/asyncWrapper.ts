const asyncWrapper = `export default async function AsyncWrapper<T>(
    asyncFn: () => Promise<T>
): Promise<[T | undefined, any]> {
    try {
        let result = await asyncFn();
        return [result, undefined];
    } catch (error) {
        return [undefined, error];
    }
}
`;

export default asyncWrapper;

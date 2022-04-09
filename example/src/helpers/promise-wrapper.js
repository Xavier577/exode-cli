async function promiseWrapper(promise) {
    try {
        let result = promise;
        return [result, undefined];
    } catch (error) {
        return [undefined, error];
    }
}

module.exports = promiseWrapper;

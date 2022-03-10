export const processResult = <T>(success: boolean, value: T, errMsg: string) => {
    if (success) {
        return value;
    }
    throw new Error(errMsg);
}
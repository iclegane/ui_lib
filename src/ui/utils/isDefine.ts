export const isDefine = (value: unknown): value is NonNullable<unknown> => {
    return !(value === null || value === undefined);
};

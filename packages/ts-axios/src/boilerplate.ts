export const boilerplate = () => `
${optionalUndefined()}
`;

const optionalUndefined = () => `
type UndefinedProps<T extends object> = {
    [K in keyof T as undefined extends T[K] ? K : never]?: T[K]
} 

// Combine with rest of the reuiqred properties
type OptionalUndefined<T extends object> = UndefinedProps<T> & Omit<T, keyof UndefinedProps<T>>
`;

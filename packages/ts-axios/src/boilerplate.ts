export const boilerplate = () => `
${optionalUndefined()}
${safeifyRequest()}
`;

const optionalUndefined = () => `
type UndefinedProps<T extends object> = {
    [K in keyof T as undefined extends T[K] ? K : never]?: T[K]
} 

// Combine with rest of the reuiqred properties
type OptionalUndefined<T extends object> = UndefinedProps<T> & Omit<T, keyof UndefinedProps<T>>
`;

const safeifyRequest = () => `
const safeifyRequest = async <REQ_B, RES_B_OK, RES_B_ERROR>(axiosInstance, vars, config, request: CallableFunction) => {
    const res = await request(axiosInstance, vars, {
        ...config,
        validateStatus: () => true
    })
    return res.status >= 200 && res.status < 300 ? {
        ok: res as unknown as AxiosResponse<RES_B_OK, REQ_B>,
        error: null,
        any: res as unknown as AxiosResponse<RES_B_OK, REQ_B>
    } : {
        ok: null,
        error: res as unknown as AxiosResponse<RES_B_ERROR, REQ_B>,
        any: res as unknown as AxiosResponse<RES_B_ERROR, REQ_B>
    }
}
`;

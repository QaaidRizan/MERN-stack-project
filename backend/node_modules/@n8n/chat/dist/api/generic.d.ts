export declare function authenticatedFetch<T>(...args: Parameters<typeof fetch>): Promise<T>;
export declare function get<T>(url: string, query?: object, options?: RequestInit): Promise<T>;
export declare function post<T>(url: string, body?: object, options?: RequestInit): Promise<T>;
export declare function postWithFiles<T>(url: string, body?: Record<string, unknown>, files?: File[], options?: RequestInit): Promise<T>;
export declare function put<T>(url: string, body?: object, options?: RequestInit): Promise<T>;
export declare function patch<T>(url: string, body?: object, options?: RequestInit): Promise<T>;
export declare function del<T>(url: string, body?: object, options?: RequestInit): Promise<T>;

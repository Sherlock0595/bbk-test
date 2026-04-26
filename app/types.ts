// FIXME: fix unkkonwn type
export type ApiResponse<T> = { success: true; data: T } | { success: false; issues: unknown };

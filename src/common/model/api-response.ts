export type ApiResponse<T = string, E = undefined> = {
  error?: E;
} & T;

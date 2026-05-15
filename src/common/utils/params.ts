export const queryParams = (params: { [key: string]: string }) =>
  new URLSearchParams(params).toString();

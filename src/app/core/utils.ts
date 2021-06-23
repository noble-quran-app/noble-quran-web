export const getFromStorage = (resource: string) => {
  return 'https://noblequranstorage.web.app' + `/${resource}`.replace(/\/+/g, '/');
};

export const asyncTimer = (time: number) => {
  return new Promise<null>((res) => setTimeout(() => res(null), time));
};

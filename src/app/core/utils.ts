export const getFromStorage = (resource: string) => {
  return 'https://noblequranstorage.web.app' + `/${resource}`.replace(/\/+/g, '/');
};

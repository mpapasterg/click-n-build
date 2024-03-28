export const useQueryParameters = (queryParams: ClientRequest) => {
  let query: string = "?";
  for (const [key, value] of Object.entries(queryParams)) {
    query += `${key}=${value}&`;
  }
  return query.substring(0, query.length - 1);
};

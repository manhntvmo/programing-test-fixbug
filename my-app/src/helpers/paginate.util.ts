export const getPageSize = (pageSize: number, limit: number) => {
  const numberOfPages = Math.ceil(pageSize / limit);

  return numberOfPages;
};

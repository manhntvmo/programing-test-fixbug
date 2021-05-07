export const paginate = (data: any[], dataPerPage: number) => {
  const numberOfPages = Math.ceil(data.length / dataPerPage);

  const newData = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * dataPerPage;
    return data.slice(start, start + dataPerPage);
  });

  return newData;
};

export const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

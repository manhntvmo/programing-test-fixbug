import moment from 'moment';

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getLastWeekStartEnd = () => {
  const startDate = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
  const endDate = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');

  return { start: startDate, end: endDate };
};

export const getLastMonthStartEnd = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDate = moment([year, month - 1]).format('YYYY-MM-DD');
  const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');

  return { start: startDate, end: endDate };
};

export const getLastYearStartEnd = () => {
  const date = new Date();
  const lastYear = date.getFullYear() - 1;
  const startDateJanuary = moment([lastYear, 0]).format('YYYY-MM-DD');
  const startDateDecember = moment([lastYear, 11]).format('YYYY-MM-DD');
  const endDateDecember = moment(startDateDecember).endOf('month').format('YYYY-MM-DD');

  return { start: startDateJanuary, end: endDateDecember };
};

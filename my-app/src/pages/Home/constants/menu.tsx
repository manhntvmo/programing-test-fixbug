interface Menu {
  title: string;
  value: string;
}

export const menusLaunchDate: Menu[] = [
  {
    title: 'Last Week',
    value: 'last_week',
  },
  {
    title: 'Last Month',
    value: 'last_month',
  },
  {
    title: 'Last Year',
    value: 'last_year',
  },
];

export const menusLaunchStatus: Menu[] = [
  {
    title: 'Failure',
    value: 'failure',
  },
  {
    title: 'Success',
    value: 'success',
  },
];

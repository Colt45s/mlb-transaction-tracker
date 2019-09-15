import moment from 'moment';

const DATE_FORMAT = 'YYYYMMDD' as 'YYYYMMDD';

export const getCurrentDate = () => {
  return moment().format(DATE_FORMAT);
};

export const getYesterday = (targetDay: string) => {
  return moment(targetDay)
    .subtract(1, 'days')
    .format(DATE_FORMAT);
};

export const getStartDate = (endDate: string) => {
  return moment(endDate)
    .subtract(1, 'weeks')
    .format(DATE_FORMAT);
};

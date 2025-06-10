import moment from 'moment';

export const getDate = (date: moment.MomentInput) =>
  moment(date).format('MMM Do YY');

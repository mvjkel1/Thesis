import moment from 'moment';
const today = moment();

export const mapEventsData = (events) => {
  return [
    {
      when: 'today',
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 0).length
    },
    {
      when: [moment().add(1, 'days').format('dddd')],
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 1).length
    },
    {
      when: [moment().add(2, 'days').format('dddd')],
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 2).length
    },
    {
      when: [moment().add(3, 'days').format('dddd')],
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 3).length
    }
  ];
};

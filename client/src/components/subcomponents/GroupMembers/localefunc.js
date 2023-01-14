export const localeFunc = (number, index, totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ['1min', 'right now'],
      ['%ss', 'in %s seconds'],
      ['1min', 'in 1 minute'],
      ['%sm', 'in %s minutes'],
      ['1h', 'in 1 hour'],
      ['%sh', 'in %s hours'],
      ['1d', 'in 1 day'],
      ['%sd', 'in %s days'],
      ['1w', 'in 1 week'],
      ['%sw', 'in %s weeks'],
      ['1m', 'in 1 month'],
      ['%sm', 'in %s months'],
      ['1y', 'in 1 year'],
      ['%sy', 'in %s years']
    ][index];
  };
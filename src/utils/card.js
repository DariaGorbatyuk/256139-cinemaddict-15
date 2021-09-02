import dayjs from 'dayjs';

const humanizeDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeRuntime = (runtime) => {
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60;
  return `${hour}h ${minute}m`;
};

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

export {humanizeDate, humanizeRuntime, EMOTIONS};

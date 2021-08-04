import {getRandomInteger} from '../utils';
import dayjs from 'dayjs';

const names = ['Erich von Stroheim', 'Mary Beth', 'Dan Duryea', 'Richard Weil', 'Anne Wigton', 'Heinz Herald'];
const commentsList = ['Awesome!', 'Interesting setting and a good cast.', 'Almost two hours? Seriously?', 'Boooooring('];
const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const createCommentDate = () => {
  const monthGap = 11;
  const dayGap = 30;
  return dayjs().subtract(getRandomInteger(0, monthGap), 'month').subtract(getRandomInteger(0, dayGap), 'day');
};

export const createComment = () => ({
  id: getRandomInteger(0, 1000),
  author: names[getRandomInteger(0, names.length - 1)],
  comment: commentsList[getRandomInteger(0, commentsList.length - 1)],
  date: createCommentDate(),
  emotion: emotions[getRandomInteger(0, emotions.length - 1)],
});

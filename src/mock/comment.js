import {getRandomInteger} from '../utils/common';
import dayjs from 'dayjs';
import {EMOTIONS} from '../utils/card';

const names = ['Erich von Stroheim', 'Mary Beth', 'Dan Duryea', 'Richard Weil', 'Anne Wigton', 'Heinz Herald'];
const commentsList = ['Awesome!', 'Interesting setting and a good cast.', 'Almost two hours? Seriously?', 'Boooooring('];


const createCommentDate = () => {
  const MONTH_IN_YEAR = 11;
  const DAY_IN_MONTH = 31;
  return dayjs().subtract(getRandomInteger(0, MONTH_IN_YEAR), 'month').subtract(getRandomInteger(0, DAY_IN_MONTH), 'day');
};

export const createComment = () => ({
  id: getRandomInteger(0, 1000),
  author: names[getRandomInteger(0, names.length - 1)],
  comment: commentsList[getRandomInteger(0, commentsList.length - 1)],
  date: createCommentDate(),
  emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)],
});

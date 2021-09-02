import AbstractView from './abstract';
import {SortType} from '../utils/const';

const createSortTemplate = () => (`<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`);

export default class SortMenu extends AbstractView{
  getTemplate() {
    return createSortTemplate();
  }
}

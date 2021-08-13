import AbstractView from './abstract';

const createShowMoreBtnTemplate = () => (`
<button class="films-list__show-more">Show more</button>`);

export default class ShowMore extends AbstractView{
  getTemplate() {
    return createShowMoreBtnTemplate();
  }
}

import {createUserTemplate} from "./view/user";
import {createMenuTemplate} from "./view/menu";

const header = document.querySelector('.header');
const main = document.querySelector('.main');


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createUserTemplate(), 'beforeend');
render(main, createMenuTemplate(), 'beforeend');

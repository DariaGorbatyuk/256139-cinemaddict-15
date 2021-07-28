import {createUserTemplate} from "./view/user";

const header = document.querySelector('.header');


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createUserTemplate(), 'beforeend');

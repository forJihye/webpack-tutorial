import './style.scss';
import {sleep} from '~/utils';

const main = async() => {
  const hello = `<div>hello</div>`;
  document.body.innerHTML = hello;
  await sleep(5000)
  const bye = `<div>bye</div>`;
  document.body.innerHTML = bye;
}
main();

const createElement = (tagName, properties = {}) => Object.assign(document.createElement(tagName), properties);
const el = createElement('h3', {innerText: 'webpack'});
document.body.appendChild(el);

const el2 = createElement('div', {innerText: 'innerText'});
document.body.appendChild(el2);

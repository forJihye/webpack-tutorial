import './style.scss';
import {sleep} from '~/utils';

const createElement = (tagName, properties = {}) => Object.assign(document.createElement(tagName), properties);
const main = async() => {
  const hello = createElement('h3', {innerText: 'hello'});
  document.body.appendChild(hello);
  await sleep(5000);
  hello.innerText = 'bye'
}
main();

const h2 = createElement('h2', {innerText: 'webpack'});
document.body.appendChild(h2);

const h3 = createElement('h3', {innerText: 'START'});
document.body.appendChild(h3); 

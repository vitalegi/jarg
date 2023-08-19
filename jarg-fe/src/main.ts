import './style.css';
import setupGame from './game/game-starter.ts';

const querySelector = <E extends Element = Element>(selector: string): E => {
  const element = document.querySelector<E>(selector);
  if (!element) {
    throw Error(`${selector} is null`);
  }
  return element;
};

setupGame(querySelector<HTMLDivElement>('#app'), window);

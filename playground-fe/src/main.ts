import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.ts';
import setupGame from './game/game-starter.ts';

const querySelector = <E extends Element = Element>(selector: string): E => {
  const element = document.querySelector<E>(selector);
  if (!element) {
    throw Error(`${selector} is null`);
  }
  return element;
};

querySelector<HTMLDivElement>('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(querySelector<HTMLButtonElement>('#counter'));
setupGame(querySelector<HTMLDivElement>('#app'));

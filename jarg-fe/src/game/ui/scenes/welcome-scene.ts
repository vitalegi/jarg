import { Graphics, Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';
import GameSceneConstants from '../../core/constants/game-scene-constants';
import { Input } from '@pixi/ui';
import TextInput from '../scene-elements/text-input';

export default class WelcomeScene extends AbstractGameScene {
  log = Logger.getInstance('WelcomeScene');

  username = '';
  password = '';

  name(): string {
    return GameSceneConstants.WELCOME;
  }

  async start() {
    const usernameInput = new TextInput(this.getContainer(), this.ctx);
    usernameInput.placeholder = 'aaaaaaa';
    usernameInput.onEnter = (val) => {
      this.log.info(`${val}`);
      this.username = val;
    };
    usernameInput.y = 500;
    usernameInput.start();
    this.getContainer().addChild(usernameInput.getElement());

    await this.ctx.getUserService().login('user', 'password');
    const isAuthenticated = await this.ctx.getUserService().isAuthenticated();
    const welcomeText = new Text('Hello ' + isAuthenticated, Fonts.text());
    welcomeText.x = (ScreenData.width() - welcomeText.width) / 2;
    welcomeText.y = 120;
    this.getContainer().addChild(welcomeText);

    const info = new ScreenInfo(this.getContainer(), this.ctx);
    info.start();

    this.addTicker((time: number) => {
      info.tick(time);
      usernameInput.tick(time);
    });
  }
}

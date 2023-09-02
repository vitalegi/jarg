import { Graphics, Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';
import GameSceneConstants from '../../core/constants/game-scene-constants';
import { Button, Input } from '@pixi/ui';
import TextInput from '../scene-elements/text-input';
import { scene } from '../../core/models/start-scene';

export default class LoginScene extends AbstractGameScene {
  log = Logger.getInstance('LoginScene');

  username = '';
  password = '';

  name(): string {
    return GameSceneConstants.LOGIN;
  }

  async start() {
    // username
    const usernameInput = new TextInput(this.getContainer(), this.ctx);
    usernameInput.placeholder = 'Username';
    usernameInput.onEnter = (val) => {
      this.username = val;
    };
    usernameInput.y = 200;
    usernameInput.start();
    this.getContainer().addChild(usernameInput.getElement());

    // password
    const passwordInput = new TextInput(this.getContainer(), this.ctx);
    passwordInput.placeholder = 'Password';
    passwordInput.onEnter = (val) => {
      this.password = val;
    };
    passwordInput.y = 280;
    passwordInput.start();
    this.getContainer().addChild(passwordInput.getElement());

    // button
    const buttonView = new Graphics().beginFill('#A5E24D').drawRoundedRect(0, 0, 100, 100, 50);
    const text = new Text('🤙', { fontSize: 50 });
    text.anchor.set(0.5);
    text.x = buttonView.width / 2;
    text.y = buttonView.height / 2;
    buttonView.addChild(text);
    buttonView.x = (ScreenData.width() - buttonView.width) / 2;
    buttonView.y = passwordInput.y + passwordInput.height + 20;
    const button = new Button(buttonView);
    button.enabled = true;
    button.onPress.connect(() => {
      this.doLogin(this.username, this.password);
    });
    this.getContainer().addChild(buttonView);

    //await this.ctx.getUserService().login('user', 'password');
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

  protected async doLogin(username: string, password: string): Promise<void> {
    try {
      await this.ctx.getUserService().login(username, password);
      this.observer.publish('scene/start', scene(GameSceneConstants.GAME_ACCESS).build());
    } catch (e) {
      this.log.info(`Login failed`);
    }
  }
}

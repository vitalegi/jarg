import { Graphics, Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import { Button } from '@pixi/ui';
import TextInput from '../scene-elements/text-input';
import SceneManager from '../scene-coordinators/scene-manager';

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

    // login button
    const signinView = new Graphics().beginFill('#A5E24D').drawRoundedRect(0, 0, 100, 60, 10);
    const signinText = new Text('Signin', { fontSize: 24 });
    signinText.anchor.set(0.5);
    signinText.x = signinView.width / 2;
    signinText.y = 30;
    signinView.addChild(signinText);
    signinView.x = ScreenData.width() / 2 - signinView.width - 10;
    signinView.y = passwordInput.y + passwordInput.height + 20;
    const button = new Button(signinView);
    button.enabled = true;
    button.onPress.connect(() => {
      this.doLogin(this.username, this.password);
    });
    this.getContainer().addChild(signinView);

    // registration button
    const signupView = new Graphics().beginFill('#A5E24D').drawRoundedRect(0, 0, 100, 60, 10);
    const signupText = new Text('Signup', { fontSize: 24 });
    signupText.anchor.set(0.5);
    signupText.x = signupView.width / 2;
    signupText.y = 30;
    signupView.addChild(signupText);
    signupView.x = ScreenData.width() / 2 + 10;
    signupView.y = passwordInput.y + passwordInput.height + 20;
    const signupButton = new Button(signupView);
    signupButton.enabled = true;
    signupButton.onPress.connect(() => {
      this.doSignup(this.username, this.password);
    });
    this.getContainer().addChild(signupView);

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
      SceneManager.startGameAccess(this.observer);
    } catch (e) {
      this.log.info(`Login failed`);
    }
  }

  protected async doSignup(username: string, password: string): Promise<void> {
    try {
      await this.ctx.getUserService().signup(username, password);
      await this.ctx.getUserService().login(username, password);
      SceneManager.startGameAccess(this.observer);
    } catch (e) {
      this.log.info(`Login failed`);
    }
  }
}

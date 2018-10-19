import { observable, action } from 'mobx';

class UiStore {
  @observable
  isScreenShot = false;

  @action
  setScreenShot() {
    this.isScreenShot = true;
  }
}

export default new UiStore();

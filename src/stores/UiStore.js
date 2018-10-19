import { observable, action } from 'mobx';
import months from '../constants/months';
import emitter from '../uiEmitter';

class UiStore {
  @observable
  isPageLoading = true;

  @observable
  selectedMonth = months[0];

  @action
  setSelectedMonth = month => {
    this.selectedMonth = month;
  };

  @action
  setLoaded = () => {
    this.isPageLoading = false;

    setTimeout(() => {
      emitter.emit('pageLoaded');
    }, 200);
  };
}

export default new UiStore();

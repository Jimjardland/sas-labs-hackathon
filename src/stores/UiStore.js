import { observable, action } from 'mobx';
import months from '../constants/months';
import emitter from '../uiEmitter';

class UiStore {
  @observable
  isPageLoading = true;
  @observable
  selectedDestination = null;

  @observable
  selectedMonth = months[0];

  @action
  setSelectedMonth = month => {
    this.selectedMonth = month;
  };

  async fetchDestinations() {
    fetch('http://localhost:4004/destinations')
      .then(res => res.json())
      .then(data => {
        console.log({ data });
      });
  }

  @action
  setLoaded = () => {
    this.isPageLoading = false;

    setTimeout(() => {
      emitter.emit('pageLoaded');
    }, 200);
  };

  @action
  setSelectedDestination(destination) {
    this.selectedDestination = destination;
  }
}

export default new UiStore();

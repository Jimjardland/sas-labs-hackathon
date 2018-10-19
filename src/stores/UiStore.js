import { observable, action } from 'mobx';
import months from '../constants/months';

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
    console.log('?');
    this.isPageLoading = false;
  };
}

export default new UiStore();

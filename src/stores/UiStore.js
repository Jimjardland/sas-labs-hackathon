import { observable, action } from 'mobx';
import months from '../constants/months';

class UiStore {
  @observable
  selectedMonth = months[0];

  @action
  setSelectedMonth = month => {
    this.selectedMonth = month;
  };
}

export default new UiStore();

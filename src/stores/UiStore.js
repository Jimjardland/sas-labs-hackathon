import { observable, action, runInAction } from 'mobx';
import months from '../constants/months';
import emitter from '../uiEmitter';
import mapInstance from '../mapInstance';

let origins = [];

class UiStore {
  @observable
  isPageLoading = true;
  @observable
  selectedDestination = null;
  @observable
  destinations = [];
  @observable
  selectedMonth = months[0];

  @action
  setSelectedMonth = month => {
    this.selectedMonth = month;
  };

  fetchDestinations() {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(destinations => {
        runInAction(() => {
          this.destinations = destinations;

          origins = []
            .concat(...destinations.map(dest => dest.origins))
            .filter(a => a.length)
            .map(a => a[0]);

          const [first] = origins;
        });
      });
  }

  @action
  setLoaded = () => {
    this.isPageLoading = false;

    setTimeout(() => {
      emitter.emit('pageLoaded');
      // TODO
      mapInstance.showLocations(origins);
      this.setSelectedDestination(origins[0]);
    }, 200);
  };

  @action
  setSelectedDestination(destination) {
    this.selectedDestination = destination;
  }
}

export default new UiStore();

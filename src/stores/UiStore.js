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

  @observable
  priceFilter = 9449;

  @observable
  showFlights = false;

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
            .filter(Boolean)
            .map(o => o.coordinates)
            .filter(Boolean);

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
    }, 200);
  };

  @action
  setSelectedDestination(destination) {
    this.selectedDestination = destination;
  }

  @action
  randomDestination = () => {
    this.selectedDestination = null;
    const destination = origins[Math.floor(Math.random() * origins.length)];

    setTimeout(() => {
      this.setSelectedDestination(destination);
    }, 100);
  };

  @action
  toggleModdal = () => {
    this.showFlights = !this.showFlights;
  };

  @action
  setPriceFilter = value => {
    this.priceFilter = value;
  };
}

export default new UiStore();

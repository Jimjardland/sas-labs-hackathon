import { observable, action, runInAction } from 'mobx';
import months from '../constants/months';
import emitter from '../uiEmitter';
import mapInstance from '../mapInstance';
import get from 'lodash/get';
import moment from 'moment';

moment.locale('sv');
let origins = [];

const mapDestinations = destinations => {
  return destinations.map(destination => {
    const { flightProducts = [] } = destination;

    const prices = {};

    flightProducts.forEach(month => {
      const m = moment(month.outBoundDate).format('MMM');

      const price = get(month, 'lowestPrice.totalPrice');
      if (price && !prices[m]) {
        prices[m] = parseInt(price);
      }
    });

    return {
      ...destination,
      city: get(destination, 'location.cityName'),
      prices
    };
  });
};

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
    this.updateLocations();
  };

  fetchDestinations() {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(destinations => {
        runInAction(() => {
          this.destinations = destinations;

          origins = mapDestinations(destinations.filter(d => d.coordinates));
        });
      });
  }

  @action
  setLoaded = () => {
    this.isPageLoading = false;

    setTimeout(() => {
      emitter.emit('pageLoaded');
      this.updateLocations();
      // TODO
    }, 200);
  };

  updateLocations = () => {
    const final = origins.map(origin => {
      const price = origin.prices[this.selectedMonth];

      return {
        ...origin,
        price: price ? `${price} ${origin.currency}` : undefined
      };
    });

    mapInstance.showLocations(final);
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
    }, 50);
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

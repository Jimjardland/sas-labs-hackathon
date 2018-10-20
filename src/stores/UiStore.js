import { observable, action, runInAction } from 'mobx';
import months from '../constants/months';
import emitter from '../uiEmitter';
import mapInstance from '../mapInstance';
import get from 'lodash/get';
import moment from 'moment';

moment.locale('sv');
let origins = [];

const points = {};

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

  user = {
    points: 9130
  };

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
          origins = mapDestinations(destinations.filter(d => d.coordinates));
          this.destinations = origins;
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
    const final = origins
      .map(origin => {
        const price = origin.prices[this.selectedMonth];

        const a = 60000 / 10000;
        const requiredBonus = a * price;
        let bonusProgress = (this.user.points / requiredBonus) * 100;

        if (price) {
          bonusProgress = bonusProgress > 100 ? 100 : parseInt(bonusProgress);
        }

        return {
          ...origin,
          priceRaw: price,
          price: price ? `${price} ${origin.currency}` : undefined,
          bonusProgress
        };
      })
      .filter(dest => dest.priceRaw && dest.priceRaw < this.priceFilter);

    mapInstance.showLocations(final);
  };

  @action
  setSelectedDestination(destination) {
    this.selectedDestination = null;

    setTimeout(() => {
      this.selectedDestination = destination;
    }, 250);
  }

  @action
  randomDestination = () => {
    const destination = origins[Math.floor(Math.random() * origins.length)];
    this.setSelectedDestination(destination);
  };

  @action
  toggleModdal = () => {
    this.showFlights = !this.showFlights;
  };

  @action
  setPriceFilter = value => {
    this.setSelectedDestination(null);
    mapInstance.removeCurrentMarker();
    this.priceFilter = value;
    this.updateLocations();
  };
}

export default new UiStore();

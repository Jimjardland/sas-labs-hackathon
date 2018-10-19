import UiStore from './stores/UiStore';

class MapInstance {
  setMap(map) {
    this.map = map;
    UiStore.setLoaded();
  }
}

export default new MapInstance();

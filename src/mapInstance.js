import UiStore from './stores/UiStore';

class MapInstance {
  setMap(map) {
    this.map = map;
    console.log('?');
    UiStore.setLoaded();
  }
}

export default new MapInstance();

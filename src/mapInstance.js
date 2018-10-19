import UiStore from './stores/UiStore';

class MapInstance {
  setMap(map, mapboxgl) {
    this.map = map;
    this.mapboxgl = mapboxgl;
    UiStore.setLoaded();
  }

  setMarker = (coordinates, element) => {
    new this.mapboxgl.Marker(element)
      .setLngLat(coordinates)
      .setPopup(
        new this.mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>hej</h3>')
      )
      .addTo(this.map);

    this.map.flyTo({ center: coordinates });
  };
}

export default new MapInstance();

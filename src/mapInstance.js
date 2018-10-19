import UiStore from './stores/UiStore';
import { featureCollection, point } from '@turf/helpers';
import throttle from 'lodash/throttle';

class MapInstance {
  setMap(map, mapboxgl) {
    this.map = map;
    this.mapboxgl = mapboxgl;
    UiStore.setLoaded();

    this.map.on(
      'wheel',
      throttle(() => {
        UiStore.setSelectedDestination(null);
        if (this.currentMarker) {
          this.currentMarker.remove();
        }
      }, 400)
    );
  }

  currentMarker;

  setMarker = (coordinates, element) => {
    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    this.currentMarker = new this.mapboxgl.Marker(element)
      .setLngLat(coordinates)
      .addTo(this.map);

    this.flyTo(coordinates);
  };

  flyTo = coordinates => {
    this.map.flyTo({ center: coordinates, zoom: 8 });
  };

  showLocations = origins => {
    const points = origins.map(origin =>
      point([origin.longitude, origin.latitude], {
        city: origin.city
      })
    );

    const srcId = 'circles';
    this.map.addSource(srcId, {
      type: 'geojson',
      data: featureCollection(points)
    });

    this.map.addLayer({
      id: 'labels',
      type: 'symbol',
      source: srcId,
      layout: {
        'text-field': '{city}'
      },
      paint: {
        'text-color': 'white'
      }
    });

    const bounds = new this.mapboxgl.LngLatBounds();

    origins.forEach(origin => {
      bounds.extend([origin.longitude, origin.latitude]);
    });

    this.map.fitBounds(bounds);
  };
}

export default new MapInstance();

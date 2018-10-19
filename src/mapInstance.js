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
      point([origin.coordinates.longitude, origin.coordinates.latitude], {
        city: origin.city,
        price: origin.price,
        currency: origin.currency
      })
    );

    const srcId = 'circles';
    const layerId = 'labels';

    if (this.map.getLayer(layerId)) this.map.removeLayer(layerId);
    if (this.map.getSource(srcId)) this.map.removeSource(srcId);

    this.src = this.map.addSource(srcId, {
      type: 'geojson',
      data: featureCollection(points)
    });

    this.currentTexts = this.map.addLayer({
      id: layerId,
      type: 'symbol',
      source: srcId,
      layout: {
        'text-field': '{price}'
      },
      paint: {
        'text-color': 'white'
      }
    });

    const bounds = new this.mapboxgl.LngLatBounds();

    origins.forEach(origin => {
      bounds.extend([
        origin.coordinates.longitude,
        origin.coordinates.latitude
      ]);
    });

    this.map.fitBounds(bounds);
  };
}

export default new MapInstance();

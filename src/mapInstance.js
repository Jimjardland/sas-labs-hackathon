import UiStore from './stores/UiStore';
import { featureCollection, point } from '@turf/helpers';
import throttle from 'lodash/throttle';
import get from 'lodash/get';
import once from 'lodash/once';

class MapInstance {
  setMap(map, mapboxgl) {
    this.map = map;
    this.mapboxgl = mapboxgl;
    UiStore.setLoaded();

    this.map.on(
      'wheel',
      throttle(() => {
        UiStore.setSelectedDestination(null);
        this.removeCurrentMarker();
      }, 400)
    );
  }

  removeCurrentMarker() {
    if (this.currentMarker) {
      this.currentMarker.remove();
    }
  }

  currentMarker;

  addClickers = once(() => {
    this.map.on('click', e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['labels']
      });
      if (!features.length) {
        return;
      }

      const airportCode = get(features[0], 'properties.airportCode');
      const result = UiStore.destinations.find(
        des => get(des, 'location.airportCode') == airportCode
      );
      UiStore.setSelectedDestination(result);
    });

    this.map.on('mousemove', e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['labels']
      });
      if (!features.length) {
        return;
      }

      this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  });

  setMarker = (coordinates, element) => {
    this.flyTo(coordinates);

    const add = () => {
      this.currentMarker = new this.mapboxgl.Marker(element)
        .setLngLat(coordinates)
        .addTo(this.map);
    };

    if (this.currentMarker) {
      setTimeout(() => {
        this.currentMarker.remove();
        add();
      }, 200);
    } else {
      add();
    }
  };

  flyTo = coordinates => {
    this.map.flyTo({ center: coordinates, zoom: 5 });
  };

  showLocations = origins => {
    const points = origins.map(origin =>
      point([origin.coordinates.longitude, origin.coordinates.latitude], {
        city: origin.city,
        price: origin.price,
        currency: origin.currency,
        bonusProgress: origin.bonusProgress,
        airportCode: origin.location.airportCode
      })
    );

    const srcId = 'circles';
    const layerId = 'labels';
    const bonusId = 'bonus';

    if (this.map.getLayer(layerId)) this.map.removeLayer(layerId);
    if (this.map.getLayer(bonusId)) this.map.removeLayer(bonusId);
    if (this.map.getSource(srcId)) this.map.removeSource(srcId);

    this.src = this.map.addSource(srcId, {
      type: 'geojson',
      data: featureCollection(points)
    });

    this.map.addLayer({
      id: layerId,
      type: 'symbol',
      source: srcId,
      layout: {
        'text-field': '{price} {bonusProgress}%'
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

    if (!this.src) {
      this.map.fitBounds(bounds);
    }
    this.addClickers();
  };
}

export default new MapInstance();

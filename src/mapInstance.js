import UiStore from './stores/UiStore';
import { featureCollection, point } from '@turf/helpers';

class MapInstance {
  setMap(map, mapboxgl) {
    this.map = map;
    this.mapboxgl = mapboxgl;
    UiStore.setLoaded();
  }

  setMarker = (coordinates, element) => {
    console.log({ coordinates, element });
    new this.mapboxgl.Marker(element)
      .setLngLat(coordinates)
      .setPopup(
        new this.mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>hej</h3>')
      )
      .addTo(this.map);

    this.map.flyTo({ center: coordinates });
  };

  addClicks = () => {
    return;
    this.map.on('click', 'labels', e => {
      console.log(e, '123');
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new this.mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map);
    });
  };

  showLocations = origins => {
    // origins.forEach(origin => {
    //   new this.mapboxgl.Marker()
    //     .setLngLat([origin.latitude, origin.longitude])
    //     .addTo(this.map);
    // });

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
    this.addClicks();
  };
}

export default new MapInstance();

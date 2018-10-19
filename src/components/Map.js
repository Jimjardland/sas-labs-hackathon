import React from 'react';
import styled from 'styled-components';
import { primaryColor } from '../vars';

let mapboxgl;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
`;
const accessToken =
  'pk.eyJ1Ijoiam9udGlzIiwiYSI6ImNqZnlhdW81MjE3azgyemtkejgwYm96Y2UifQ.9EbA8Z8QJGw2M8SBnLBSGg';

class Map extends React.Component {
  container = React.createRef();

  componentDidMount() {
    mapboxgl = require('mapbox-gl');
    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: this.container.current,
      style: 'mapbox://styles/jontis/cjfyb4vzm6hm02rob93cz4g4o',
      zoom: 4.5,
      minZoom: 3,
      maxZoom: 10,
      center: [17.06324, 61.334591],
      pitch: 30
    });

    this.map.scrollZoom.disable();
  }

  render() {
    return <Wrapper innerRef={this.container} />;
  }
}

export default Map;

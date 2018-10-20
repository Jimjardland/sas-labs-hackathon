import React from 'react';
import styled from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import anime from 'animejs';
import { findDOMNode } from 'react-dom';
import mapInstance from '../mapInstance';
import get from 'lodash/get';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  z-index: 500;
  background: #fff;
  border-radius: 4px;
  color: #333;
  width: 250px;

  img {
    max-width: 100%;
  }
`;

const Inner = styled.div`
  padding: 10px;
`;

const Stats = styled.div`
  font-size: 14px;
  color: #3c3c3c;
`;

const Flights = styled.div`
  color: ${light};
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

const ImageWrap = styled.div`
  height: 130px;
  overflow: hidden;
`;

class SelectedDestination extends React.Component {
  wrapper = React.createRef();

  state = {
    mounted: false
  };

  componentDidMount() {
    const element = findDOMNode(this.wrapper.current);

    mapInstance.setMarker(
      [
        this.props.destination.coordinates.longitude,
        this.props.destination.coordinates.latitude
      ],
      element.cloneNode(true)
    );

    document.querySelector('#flightToggle').addEventListener('click', () => {
      UiStore.toggleModdal();
    });

    this.setState({ mounted: true });
  }

  render() {
    const { destination } = this.props;
    const { formattedAddress, country } = destination;

    if (this.state.mounted) return null;

    return (
      <Wrapper innerRef={this.wrapper}>
        <ImageWrap>
          <img
            src={`https://source.unsplash.com/260x150/?${get(
              destination,
              'originCity.name'
            )}`}
          />
        </ImageWrap>
        <Inner>
          <h3>{formattedAddress}</h3>
          <Stats>
            <div>🌈 LGBT friendly</div>
            <div>🍽 3 Michelin star</div>
            <div>🥦 Vegan friendly</div>
            <div>☀️ Average 26°</div>
          </Stats>
          <Flights id="flightToggle" onClick={() => console.log('asd')}>
            Visa tillgängliga flyg
          </Flights>
        </Inner>
      </Wrapper>
    );
  }
}

export default SelectedDestination;

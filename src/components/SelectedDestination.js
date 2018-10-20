import React from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import anime from 'animejs';
import { findDOMNode } from 'react-dom';
import mapInstance from '../mapInstance';
import get from 'lodash/get';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.85);
  }

  to {
    opacity: 1;
    transform: scale(1)
  }
`;

injectGlobal`
  .mapboxgl-marker #selected {
    opacity: 0;
    animation-delay: 0.2s
  }

  .mapboxgl-marker.fadeIn #selected{
    
    animation: ${fadeIn} 0.4s ease forwards;
  }

  #selected {
    transition: opacity 0.3s ease;
  }
  .fadeOut {
    opacity: 0 !important;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  z-index: 500;
  background: #fff;
  border-radius: 4px;
  color: #333;
  width: 250px;

  @media (max-width: 730px) {
    margin-right: 51px;
  }

  img {
    max-width: 100%;
  }

  h3 {
    display: flex;
    align-items: center;
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
const Airport = styled.span`
  color: #8b8b8b;
  font-size: 13px;
  margin-left: 5px;
`;
const OutSide = styled.div`
  display: inline-block;
`;
const FlightTime = styled.div`
  font-size: 13px;
  margin-bottom: 5px;

  span {
    margin-right: 5px;
  }
`;

class SelectedDestination extends React.Component {
  wrapper = React.createRef();

  state = {
    mounted: false
  };

  componentWillUnmount() {
    const current = document.querySelector('#selected');
    if (current) {
      current.classList.add('fadeOut');
    }
  }

  componentDidMount() {
    const element = findDOMNode(this.wrapper.current);
    const target = element.cloneNode(true);

    mapInstance.setMarker(
      [
        this.props.destination.coordinates.longitude,
        this.props.destination.coordinates.latitude
      ],
      target
    );

    setTimeout(() => {
      target.classList.add('fadeIn');
      document.querySelector('#flightToggle') &&
        document
          .querySelector('#flightToggle')
          .addEventListener('click', () => {
            UiStore.toggleModdal();
          });
    }, 200);
    this.setState({ mounted: true });
  }

  render() {
    const { destination } = this.props;
    const { formattedAddress, country } = destination;

    if (this.state.mounted) return null;

    console.log({ ...destination });
    return (
      <OutSide innerRef={this.wrapper}>
        <Wrapper id="selected">
          <ImageWrap>
            <img
              src={`https://source.unsplash.com/260x150/?${get(
                destination,
                'location.country'
              )}`}
            />
          </ImageWrap>
          <Inner>
            <h3>
              {get(destination, 'location.cityName')} -{' '}
              {get(destination, 'location.country')}
              <Airport>{get(destination, 'location.airportCode')}</Airport>
            </h3>
            <FlightTime>
              <span>{get(destination, 'flightInformation.flight_time')}</span>
              <span>
                {get(destination, 'flightInformation.flight_distance')} km
              </span>
            </FlightTime>
            <Stats>
              <div>🌈 LGBT friendly</div>
              <div>🍽 3 Michelin star</div>
              <div>🥦 Vegan friendly</div>
              <div>☀️ Average 26°</div>
            </Stats>
            <Flights id="flightToggle">Visa tillgängliga flyg</Flights>
          </Inner>
        </Wrapper>
      </OutSide>
    );
  }
}

export default SelectedDestination;

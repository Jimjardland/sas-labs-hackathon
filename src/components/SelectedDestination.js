import React from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import anime from 'animejs';
import { findDOMNode, createPortal } from 'react-dom';
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
.selected-marker {
  display:inline-block;
}

  .fadeIn {
    animation: ${fadeIn} 0.4s ease forwards;
  }

  #selected {
    transition: opacity 0.3s ease;
  }
  .fadeOut {
     opacity: 0 !important;
  }
`;

//   animation: ${fadeIn} 0.4s ease forwards;
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  z-index: 500;
  background: #fff;
  border-radius: 4px;
  color: #333;
  width: 340px;

  @media (max-width: 730px) {
    margin-right: 51px;
    margin-top: -57px;
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
  margin-top: 5px;
  color: #3c3c3c;
`;

const Flights = styled.div`
  color: ${light};
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

const ImageWrap = styled.div`
  height: 175px;
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
const Step = styled.div`
  font-size: 13px;

  span {
    margin-right: 5px;
  }
`;
const Bonus = styled.span`
  font-weight: bold;
  font-family: 'ScandinavianNew', 'Helvetica', sans-serif;

  color: ${light};
`;

class SelectedDestination extends React.Component {
  render() {
    const { destination } = this.props;
    const { formattedAddress, country, requiredPoints } = destination;

    return (
      <Wrapper id="selected">
        <ImageWrap>
          <img
            src={`https://source.unsplash.com/340x175/?${get(
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
          <Step>
            <span>{get(destination, 'flightInformation.flight_time')}</span>
            <span>
              {get(destination, 'flightInformation.flight_distance')} km
            </span>
          </Step>
          <Step>
            Krävda EuroBonus poäng: <Bonus>{requiredPoints}</Bonus>
          </Step>
          <Step>
            Platser kvar: <Bonus>23</Bonus>
          </Step>
          <Stats>
            <div>🎵 Kendrick Lamar - 25 okt</div>
            <div>🎵 Magnus Uggla - 25 nov</div>
            <div>🍽 3 Michelin star</div>
            <div>☀️ Average 26°</div>
          </Stats>
          <Flights onClick={UiStore.toggleModdal} id="flightToggle">
            Visa tillgängliga flyg
          </Flights>
        </Inner>
      </Wrapper>
    );
  }
}

export default SelectedDestination;

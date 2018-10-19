import React from 'react';
import styled from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import anime from 'animejs';
import { findDOMNode } from 'react-dom';
import mapInstance from '../mapInstance';

const Wrapper = styled.div``;

class SelectedDestination extends React.Component {
  wrapper = React.createRef();

  state = {
    mounted: false
  };

  componentDidMount() {
    mapInstance.setMarker(
      this.props.destination.coordinates,
      findDOMNode(this.wrapper.current)
    );
  }

  render() {
    const { destination } = this.props;
    const { title } = destination;

    if (this.state.mounted) return null;

    return (
      <Wrapper innerRef={this.wrapper}>
        <h2>{title}</h2>
      </Wrapper>
    );
  }
}

export default SelectedDestination;

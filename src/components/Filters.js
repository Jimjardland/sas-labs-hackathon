import React from 'react';
import styled from 'styled-components';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import PriceSlider from './PriceSlider';
import emitter from '../uiEmitter';
import anime from 'animejs';
import { findDOMNode } from 'react-dom';

const Container = styled.div`
  position: fixed;
  bottom: 50px;
  z-index: 50;
  left: 50%;
  display: flex;

  @media (max-width: 730px) {
    bottom: 2px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  opacity: 0;
`;

const Part = styled.div`
  text-align: center;
`;

@observer
class Filters extends React.Component {
  wrapper = React.createRef();

  componentDidMount() {
    emitter.on('pageLoaded', this.show);
  }

  show = () => {
    anime({
      targets: findDOMNode(this.wrapper.current),
      opacity: [0, 1],
      translateY: [20, 0],
      translateX: ['-50%', '-50%']
    });
  };

  render() {
    const { destination } = this.props;

    return (
      <Container>
        <Wrapper innerRef={this.wrapper}>
          <Part>
            <h4>Pris</h4>
            <PriceSlider />
          </Part>
        </Wrapper>
      </Container>
    );
  }
}

export default Filters;

import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import styled from 'styled-components';
import { lighest } from '../vars';

const Parent = styled.div`
  width: 300px;

  .rangeslider-horizontal .rangeslider__handle:after,
  .rangeslider-horizontal .rangeslider__fill {
    background-color: ${lighest};
  }

  .rangeslider-horizontal .rangeslider__handle:after {
    box-shadow: none;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

const Prices = styled.div`
  display: flex;
  justify-content: space-between;
`;

const max = 9449;
const min = 349;

class PriceSlider extends React.Component {
  state = {
    value: max
  };

  handleChangeStart = () => {
    console.log('Change event started');
  };

  handleChange = value => {
    this.setState({
      value: value
    });
  };

  handleChangeComplete = () => {
    console.log('Change event completed');
  };

  render() {
    return (
      <Parent>
        <Slider
          min={min}
          max={max}
          value={this.state.value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <Prices>
          <span>{min} SEK</span>
          <span>{max} SEK</span>
        </Prices>
      </Parent>
    );
  }
}

export default PriceSlider;

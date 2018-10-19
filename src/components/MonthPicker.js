import React from 'react';
import styled from 'styled-components';
import { middle, darkest, light } from '../vars';
import months from '../constants/months';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';

const Container = styled.div`
  position: absolute;
  z-index: 20;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid ${darkest};
  border-radius: 5px 0 0 5px;
`;

const Part = styled.div`
  color: #fff;
  background: ${props => (props.selected ? light : middle)};
  padding: 10px 20px;
  border-bottom: 1px solid ${darkest};
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  &:last-child {
    border-bottom: 0;
  }
`;

@observer
class MonthPicker extends React.Component {
  componentDidMount() {}

  render() {
    const { selectedMonth, setSelectedMonth } = UiStore;

    return (
      <Container>
        {months.map(date => (
          <Part
            onClick={() => setSelectedMonth(date)}
            selected={selectedMonth === date}
            key={date}
          >
            {date}
          </Part>
        ))}
      </Container>
    );
  }
}

export default MonthPicker;

import React from 'react';
import styled from 'styled-components';
import Map from './Map';
import DatePicker from './MonthPicker';
import Intro from './Intro';

const Container = styled.div``;
class MainPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <Intro />
        <Map />
        <DatePicker />
      </Container>
    );
  }
}

export default MainPage;

import React from 'react';
import styled from 'styled-components';
import Map from './Map';
import DatePicker from './MonthPicker';

const Container = styled.div``;
class MainPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <Map />
        <DatePicker />
      </Container>
    );
  }
}

export default MainPage;

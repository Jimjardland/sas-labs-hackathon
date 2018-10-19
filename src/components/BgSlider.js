import React from 'react';
import styled from 'styled-components';
import image1 from '../../images/slider/1.jpg';
import image2 from '../../images/slider/2.jpg';
import image3 from '../../images/slider/3.jpg';
import image4 from '../../images/slider/4.jpg';
import Loader from './Loader';
import UiStore from '../stores/UiStore';

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;
const LoaderElem = styled.div`
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  pointer-events: none;
  transition: opacity 0.4s ease;
  opacity: ${props => (props.visible ? 1 : 0)};
`;
const BgImg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  background-position: center;
  transition: opacity 0.25s ease;

  ${props => `opacity: ${props.visible ? 1 : 0}`};
  ${props => `background-image:  url(${props.image})`};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.48);
  }
`;

const images = [image1, image2, image3, image4];

class BgSlider extends React.Component {
  state = {
    count: 0,
    visible: true,
    loaded: UiStore.isScreenShot
  };

  loadImg = src => {
    const img = new Image();
    img.src = src;

    return new Promise(resolve => {
      img.onload = resolve;
    });
  };

  async componentDidMount() {
    await this.loadImg(image1);

    this.setState({
      loaded: true
    });

    this.props.setLoaded();

    const [firstImage, ...remainingImages] = images;
    remainingImages.forEach(image => this.loadImg(image));

    setInterval(() => {
      const count =
        this.state.count + 2 > images.length ? 0 : this.state.count + 1;

      this.setState({ visible: false }, () => {
        setTimeout(() => this.setState({ count, visible: true }), 300);
      });
    }, 5500);
  }

  render() {
    const { count, visible, loaded } = this.state;

    return (
      <Container visible={visible}>
        <LoaderElem visible={!loaded}>
          <Loader />
        </LoaderElem>
        <BgImg visible={visible && loaded} image={images[count]} />
      </Container>
    );
  }
}

export default BgSlider;

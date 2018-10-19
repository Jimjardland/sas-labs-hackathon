import React from 'react';
import UiStore from '../stores/UiStore';
import { observer } from 'mobx-react';
import SelectedDestination from './SelectedDestination';

@observer
class MapInfo extends React.Component {
  componentDidMount() {
    const fakeDest = {
      coordinates: [2.440172, 41.561017],
      title: 'Singapore',
      image:
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=abca021e18ebbf3e780ad03d7f4f598e&auto=format&fit=crop&w=3349&q=80'
    };

    setTimeout(() => {
      UiStore.setSelectedDestination(fakeDest);
    }, 2500);
  }

  render() {
    const { selectedDestination } = UiStore;

    return (
      <React.Fragment>
        {selectedDestination && (
          <SelectedDestination destination={selectedDestination} />
        )}
      </React.Fragment>
    );
  }
}

export default MapInfo;

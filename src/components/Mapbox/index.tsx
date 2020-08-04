import React, { useState } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Mapbox = () => {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '',
  });

  const [point] = useState<[number, number]>([0.2416815, 51.5285582]);

  return (
    <Map
      center={point}
      style='mapbox://styles/mapbox/streets-v9'
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}>
      <Layer type='circle' id='marker' layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={point} />
      </Layer>
    </Map>
  );
};

export default Mapbox;

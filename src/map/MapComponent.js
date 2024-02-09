import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import HappyHourApi from '../api/backendApi.js';
import { Link } from 'react-router-dom';

const Map = () => {
  const [spaceLocations, setSpaceLocations] = useState([]);
  const [clickedSpace, setClickedSpace] = useState(null);

  useEffect(() => {
    const fetchSpaceLocations = async () => {
      try {
        const response = await HappyHourApi.request('spaces');
        const spaces = response.spaces;

        if (!Array.isArray(spaces)) {
          console.error('Invalid response format. Expected an array of spaces.');
          return;
        }

        const locations = await Promise.all(
          spaces.map(async (space) => {
            const address = space.address;

            const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const { lat, lng } = data.results[0].geometry.location;
              return { id: space.space_id, title: space.title, lat, lng };
            } else {
              console.error('No results found for the given address.');
              return null;
            }
          })
        );

        setSpaceLocations(locations.filter(location => location !== null));
      } catch (error) {
        console.error('Error while fetching space locations:', error);
      }
    };

    fetchSpaceLocations();
  }, []);

  const mapStyles = {
    height: '700px',
    width: '100%',
  };


  const handleMarkerClick = (space) => {
    setClickedSpace(space);
  };

  const handleInfoWindowClose = () => {
    setClickedSpace(null);
  };

  return (
    <div className='Map-Container'>
      <GoogleMap mapContainerStyle={mapStyles} center={spaceLocations[9]} zoom={8}>
        {spaceLocations.map(space => (
          <Marker
            key={space.id}
            position={{
              lat: parseFloat(space.lat),
              lng: parseFloat(space.lng),
            }}
            onClick={() => handleMarkerClick(space)}
          />
        ))}

        {clickedSpace && (
          <InfoWindow
            position={{ lat: clickedSpace.lat, lng: clickedSpace.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
            <Link to={`spaces/${clickedSpace.title}`}><h5>{clickedSpace.title}</h5></Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;

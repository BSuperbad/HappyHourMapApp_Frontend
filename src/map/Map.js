import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import HappyHourApi from '../api/backendApi.js';
import { Link, useParams } from 'react-router-dom';
import '../spaces/Spaces.css';

const Map = () => {
  const { title } = useParams();
  const [location, setLocation] = useState(null);
  const [space, setSpace] = useState(null);
  const [clickedSpace, setClickedSpace] = useState(null);

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {

        console.log('process.env:', process.env);

        const spaceDetails = await HappyHourApi.request(`spaces/${title}`);
        setSpace(spaceDetails.space);

        const address = spaceDetails.space.address;
        console.log(address)
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Geocoding Response:', data);

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          console.error('No results found for the given address.');
        }
      } catch (error) {
        console.error('Error while fetching space details:', error);
      }
    };

    fetchSpaceDetails();
  }, [title]);

  const mapStyles = {
    height: '400px',
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
      <div>
        <Link style={{textDecoration: "none"}} to={`/spaces/${title}`}>
          <h2 className='Space-Title'>{title}</h2>
        </Link>
        {space && (
          <div>
            <p>{space.description}</p>
            <p>Address: {space.address}</p>
          </div>
        )}
      </div>
      {location && (
        <div className='Map-Section'>
          <GoogleMap mapContainerStyle={mapStyles} center={location} zoom={15}>
            {location && (
              <Marker
                position={location}
                onClick={() => handleMarkerClick(space)}
              />
            )}
            {clickedSpace && (
              <InfoWindow
                position={{ lat: location.lat, lng: location.lng }}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <Link to={`/spaces/${clickedSpace.title}`}>
                    <h5>{clickedSpace.title}</h5>
                  </Link>
                  {/* You can add additional information about the clicked space if needed */}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default Map;


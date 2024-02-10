import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin.js';
import '../spaces/Spaces.css';
import useFetchSpace from '../hooks/useFetchSpace.js';
import { Link, useParams } from 'react-router-dom';
import './map.css';
import '../spaces/Spaces.css'

const MapTest = () => {
    const {title} = useParams()
  const [location, setLocation] = useState(null);
  const space = useFetchSpace(title);

  useEffect(() => {
    const geocode = async () => {
      try {
        if(space){
            const address = space.address
        
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await fetch(geocodeUrl);
        const data = await response.json();


        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          console.error('No results found for the given address.');
        }
    }
      } catch (error) {
        console.error('Error while fetching location:', error);
      }
    };

    geocode();
  }, [space]);


  return (
    <div className='Map-Container'>
      <div>
      <Link style={{color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)"}} to={`/spaces/${title}`}>
        <h1>{title}</h1>
        </Link>
        {space &&
        <>
        <p>{space.description}</p>
        <p>Address: {space.address}</p>
        </>
    }
      </div>
      {location && (
        <div className='google-map'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            center={location}
            defaultZoom={15}
            onChange={({ center }) => setLocation(center)}
          >
            <LocationPin
              lat={location.lat}
              lng={location.lng}
              text={title}
            />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default MapTest;

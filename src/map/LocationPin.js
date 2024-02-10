import { Icon } from '@iconify/react';
import './map.css'

const LocationPin = ({ lat, lng, text }) => {
    console.log(lat, lng, text);
    return (
    <div className="pin" style={{ position: 'absolute', transform: `translate(-50%, -50%)`, left: {lng}, top: {lat} }}>
      <Icon icon="map:map-pin"  style={{color: "#f4978e", fontSize: "50px"}}/>
      <p className="pin-text">{text}</p>
    </div>
  );
    }

  export default LocationPin;
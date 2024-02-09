import React from "react";
import { Link } from "react-router-dom";

/** LocationCard Component for listing cities, from here,
 * user can click on city and it will take them to the list of neighborhoods
*/

const LocationCard = ({city, neighborhood}) => {
    console.debug("LocationCard");
return (
    <Link style={{color: "#f4978e"}} to={`/locations/spaces/${city}/${neighborhood}`}>
        <h6>{city}, {neighborhood}</h6>
    </Link>
)

};

export default LocationCard;
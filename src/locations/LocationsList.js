import React, { useState, useEffect, useContext } from "react";
import HappyHourApi from "../api/backendApi.js";
import LocationCard from "./LocationCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.js";

/** Show page with list of locations {city, neighborhood} to choose from.
 *
 * On mount, loads locations from API.
 *
 * This is routed to at /locations
 * 
 * From here, user can click on location that takes them to 
 * list of spaces in that city
 *
 * Routes -> {LocationCard}
 */

function LocationsList() {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  console.debug("LocationsList");
  const [locs, setLocs] = useState(null);
  const {currentUser} = useContext(UserContext)

  useEffect(() => {
  const getLocs = async () => {
    try {
        const locData = await HappyHourApi.request("locations");
        setLocs(locData.locations);
    }catch(e){
        console.error("Error fetching locations:", e)
    }
  };
  getLocs();
}, []);

  if (!locs) return <LoadingSpinner />;

  return (
      <div>
        <h1 style={textColor}>List of Locations</h1>
        {locs.length
            ? (
                <div>
                  {locs.map(l => (
                      <LocationCard
                          key={l.loc_id}
                          city={l.city}
                          neighborhood={l.neighborhood}
                      />
                  ))}
                </div>
            ) : (
                <p>Sorry, no results were found!</p>
            )}
            {}
            {currentUser.isAdmin 
            ?
           <Link to="/locations/new"><button className="btn btn-light"> Add New Location</button></Link>
           :
           null
            }
      </div>
  );
}

export default LocationsList;

import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SpaceCard from "../spaces/SpaceCard.js";
import UserContext from "../context/UserContext.js";
import useSpacesByLocation from "../hooks/useSpacesByLocation.js";

/** Show page with list of spaces by location
 * 
 * loads spaces by location from HappyHour API.
 * 
 * Routed to /spaces?neighborhood=:neighborhood
 * Routes -> { SpaceCard }
 */

const LocationDetailWithSpaces = () => {
  console.debug("LocationDetailWithSpaces");
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const {currentUser} = useContext(UserContext)
  const {city, neighborhood} = useParams();
  const {spaces, loading} = useSpacesByLocation(city, neighborhood);

    const withoutSpaces = () => {
      return (
        <div>
        <h1 style={textColor}>No spaces in {city}, {neighborhood}...yet</h1>
        </div>
      )
    };
    const withSpaces = ()=>{
      return (
        <div>
         <h1 style={textColor}>Spaces in {city}, {neighborhood}</h1>
              <div>
                {spaces.map((s) => (
                  <SpaceCard
                    key={s.space_id}
                    title={s.title}
                    description={s.description}
                    category={s.category}
                    address={s.address}
                    est_year={s.est_year}
                  />
                ))}
              </div>
        </div>
      )
    }

      return (
          <div>
            {loading && <p>Loading...</p>}
            {!loading && (spaces ? withSpaces() : withoutSpaces())}
      {currentUser.isAdmin && (
        <Link to={`/locations/${city}/${neighborhood}/edit`}>
          <button className="btn btn-light">Edit {city}, {neighborhood}</button>
        </Link>
      )}
    </div>
      );
  }

 

export default LocationDetailWithSpaces;
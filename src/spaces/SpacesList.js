import React, { useContext, useEffect, useState } from "react";
import HappyHourApi from "../api/backendApi.js";
import SpaceCard from "./SpaceCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import UserContext from "../context/UserContext.js";
import { Link } from "react-router-dom";

/** Show page with list of spaces
 * 
 * loads spaces from HappyHour API.
 * Re-loads filtered spaces on submit from search form .
 * 
 * Routed to /spaces
 * Routes -> { SpaceCard, SearchForm}
 * Must be logged in to see spaces
 */

const SpacesList = ({remove}) => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }

  const {currentUser} = useContext(UserContext)
    console.debug("SpacesList");
    const [spaces, setSpaces] = useState([]);
  
    useEffect(() => {
      const getSpacesList = async () => {
        try {
          const spacesData = await HappyHourApi.request("spaces");
          setSpaces(spacesData.spaces);
        } catch (error) {
          console.error("Error fetching spaces", error);
        }
      };
      getSpacesList();
    }, []);

    const getUserSpacesInfo = async () =>{
      try{
        const visitedSpacesResponse = await HappyHourApi.getVisited(currentUser.username);
        const likedSpacesResponse = await HappyHourApi.getLikedSpaces(currentUser.username);
        const visitedSpaces = visitedSpacesResponse || [];
        const likedSpaces = likedSpacesResponse || [];
        return {visitedSpaces, likedSpaces};
      } catch(e){
        console.error("Error fetching user spaces info", e);
        return{ visitedSpaces: [], likedSpaces: []}
      }
    };

    if (!spaces) return <LoadingSpinner />;

    return (
        <div>
          <h2 style={{textColor}}>List of Spaces</h2>
          <div>
            {spaces.map((s) => (
              <SpaceCard
              key={s.space_id}
              title={s.title}
              description={s.description}
              category={s.category}
              address={s.address}
              est_year={s.est_year}
              city={s.city}
              neighborhood={s.neighborhood}
              averageRating={s.avg_rating}
              getUserSpacesInfo={getUserSpacesInfo}
              remove={remove}
          />
            ))}
          </div>
          {currentUser.isAdmin ? 
          <Link  to="/spaces/new">
            <button className="btn btn-light">Add a Space</button>
          </Link>
          :
          null}
        </div>
    )
    
};

export default SpacesList;
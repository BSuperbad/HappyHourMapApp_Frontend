import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import useLikeSpace from "../hooks/useLikeSpace.js";
import useMarkSpaceVisited from "../hooks/useMarkSpaceVisited.js";

/** Show info about space
 * 
 * Rendered by SpacesList to show SpaceCard for each space.
 * 
 * SpacesList -> SpaceCard
 * 
 * Again, must be logged in to see
 */


const SpaceCard = ({ title, description, category, address, est_year, city, neighborhood, averageRating }) => {
  console.debug("SpaceCard", title);
  const { currentUser } = useContext(UserContext);

  
  const {isLiked, handleLikeClick} = useLikeSpace(currentUser, title);
  const {visited, visitDate, handleVisitClick} = useMarkSpaceVisited(currentUser, title);

  if (!currentUser) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Link style={{color: "#f4978e"}} to={`/spaces/${title}`}>
        <h3>{title}</h3>
      </Link>
      {averageRating ? (
        <p>
          Average Rating: {parseFloat(averageRating).toFixed(1)}
        </p>
      ) : null}
      <button className="btn btn-light" onClick={handleVisitClick} disabled={visited}>
        {visited ? `Visited ${visitDate}` : `Mark ${title} As Visited`}
      </button>
      <button className="btn btn-light" onClick={handleLikeClick}>
        {isLiked ? "Unlike" : "Like"}
      </button>
      
      <p>Description: {description}</p>
      {category && (
      <p>Category: <Link style={{color: "#f4978e"}} to={`/categories/${category}`}> {category}</Link></p>
      )}

      <p>Address: <Link style={{color: "#f4978e"}} to={`/map/${title}`}>{address}</Link></p>
      <p>Project Year: {est_year}</p>
      {city && neighborhood ? (
        <p>Area: <Link style={{color: "#f4978e"}} to={`/locations/spaces/${city}/${neighborhood}`}> {city}, {neighborhood}</Link></p>
      ) : null}
    </div>
  );
};

export default SpaceCard;

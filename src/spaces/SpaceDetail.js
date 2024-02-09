import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner.js";
import UserContext from "../context/UserContext.js";
import useFetchAvgRating from "../hooks/useFetchAvgRating.js";
import useFetchSpace from "../hooks/useFetchSpace.js";
import useLikeSpace from "../hooks/useLikeSpace.js";
import './Spaces.css'
import useMarkSpaceVisited from "../hooks/useMarkSpaceVisited.js";

/** Space Detail page.
 *
 * Renders information about space.
 *
 * Routed at /spaces/:title
 *
 * Routes -> SpaceDetail
 */

const SpaceDetail = ()=> {
  const { currentUser } = useContext(UserContext)
  const { title } = useParams();
  console.debug("SpaceDetail", "title=", title);

  const space = useFetchSpace(title);
  const avgRating = useFetchAvgRating(title);
  const {isLiked, handleLikeClick} = useLikeSpace(currentUser, title);
  const {visited, visitDate, handleVisitClick} = useMarkSpaceVisited(currentUser, title)

  if (!space) return <LoadingSpinner />;
  return (
      <div className="Space-Detail-Container">
        <h1 className="Space-Title">{space.title}</h1>
        <img className="Space-Image" src={space.image_url}
            alt={space.title}
                />
        <div className="Over-Image">
        <button className="btn btn-light" onClick={handleLikeClick}>
        {isLiked ? "Unlike" : "Like"} {space.title}
      </button>
        <button className="btn btn-light" onClick={handleVisitClick} disabled={visited}>
        {visited ? `Visited ${visitDate}` : `Mark ${space.title} As Visited`} 
      </button>
  
        <p 
        style={{
          color: 'white',
          fontStyle: 'italic',
          textShadow: '2px 2px 1px rgba(244, 151, 142, 1)',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>{space.description}</p>
        
        
            <p>
            <Link 
            style={{
              color: "#f4978e", 
              fontWeight: 'bold', 
              fontSize: '20px', 
              textShadow: '2px 2px 1px rgba(255, 255, 255, 1)' 
              }} to={`/categories/${space.category}`}>
              {space.category}
              </Link>
              </p>
        
        <Link style={{
              color: "#f4978e", 
              fontWeight: 'bold', 
              fontSize: '20px', 
              textShadow: '2px 2px 1px rgba(255, 255, 255, 1)' 
              }} to={`/comments/spaces/${space.title}`}>
          <p>Comments</p>
        </Link>
          <p style={{color: 'white', fontSize: '20px', textShadow: '2px 2px 1px rgba(244, 151, 142, 1)',
          fontWeight: 'bold'  }}>Address: <Link style={{
              color: "#f4978e", 
              fontWeight: 'bold', 
              fontSize: '20px', 
              textShadow: '2px 2px 1px rgba(255, 255, 255, 1)' 
              }} 
              to={`/map/${title}`}>{space.address}</Link></p>
          <p style={{
          color: 'white',
          textShadow: '2px 2px 1px rgba(244, 151, 142, 1)',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>Project Year: {space.est_year}</p>
          {avgRating !== null && !isNaN(avgRating)
          ?
          <p 
          style={{
            color: 'white',
            textShadow: '2px 2px 1px rgba(244, 151, 142, 1)',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
          >Average Rating: {parseFloat(avgRating).toFixed(1)}</p>
          :
          null}
        <Link to={`/ratings/${currentUser.username}/spaces/${space.title}/new`}>
          <button className="btn btn-light">Rate {space.title}</button>
        </Link>
        {currentUser.isAdmin
        ?
        <Link to={`/spaces/${space.title}/edit`}>
            <button className="btn btn-light">Edit {space.title}</button>
          </Link>
        :
        null}
          </div>
      </div>
  );
}

export default SpaceDetail;

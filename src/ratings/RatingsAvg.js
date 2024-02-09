import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HappyHourApi from "../api/backendApi.js";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";

/** Show page with average rating of a space */

const RatingAvg = () => {
    const {currentUser} = useContext(UserContext)
    const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
    const {title} = useParams()
    const [avgRating, setAvgRating] = useState(null);
  
    useEffect(() => {
      const fetchAvgRating = async () => {
        try {
            const response = await HappyHourApi.getAvgRating(title);
            setAvgRating(response);
        } catch (error) {
          console.error('Error fetching average rating', error);
        }
      };
  
      fetchAvgRating();
    }, [title]);
  
    return (
      <div>
        <h1 style={textColor}>{`${title} Average Rating: ${avgRating}`}</h1>
        <Link to={`/ratings/${currentUser.username}/spaces/${title}/new`}>
        <button className="btn btn-light">Rate {title}</button>
        </Link>
      </div>
    );
  };
  
  export default RatingAvg;
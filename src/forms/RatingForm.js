import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import HappyHourApi from "../api/backendApi.js";

/** Add a new RATING form.
 *
 * Shows form and manages update to state on changes.
 *
 * Routes -> RatingForm 
 * Routed as /ratings/new
 * 
 * Must be logged in.
 */

const RatingForm = () => {
    const {currentUser} = useContext(UserContext)
    const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
    const navigate = useNavigate();
    const { username, title } = useParams()
    const INITIAL_STATE = {
    rating: ""

    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [userRating, setUserRating] = useState(null);

    useEffect(() => {
      const fetchUserRating = async () => {
        try {
          const response = await HappyHourApi.getUserRating(username, title);
          setUserRating(response);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setUserRating(null);
          } else {
            console.error("Error fetching user rating", error);
          }
        }
      };
  
      if (currentUser) {
        fetchUserRating();
      }
    }, [currentUser, username, title]);

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormData(data=> ({
            ...data,
            [name] : value
        }));
    }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!currentUser) {
        console.error("Unauthorized: Must be logged in to rate a space!");
        return;
      }
      const { rating } = formData;
    try {
        await HappyHourApi.addRating(username, title,{
            rating
        });
        navigate(`/ratings/spaces/${title}`);
        setFormData(INITIAL_STATE);
    }catch(error){
        console.error("Failed to add rating", error)
    }

  };

  const alreadyRated = () =>{
    return (
      <>
      <p>You've already rated {title}</p>
      <Link to={`/ratings/${userRating.rating.rating_id}/edit`}>
        <button className="btn btn-light">Edit Rating</button>
      </Link>
      </>
    )
  }

  const newRating = () => {
    return (
      <>
            <h1 style={textColor}>Rate Space: {title}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value="">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br/>
        <button className="btn btn-light">Submit</button>
      </form>
      </>
    )
  }

  console.debug(
      "Rating",
      "formData=", formData,
  );



  return (
    <div>
{userRating && userRating.rating? alreadyRated() : newRating()}
    </div>
  );
};

export default RatingForm;
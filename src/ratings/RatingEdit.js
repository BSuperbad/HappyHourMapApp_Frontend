import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import HappyHourApi from "../api/backendApi.js";

const RatingEdit = ({update, remove}) => {
  console.debug("RatingEdit");

  const { currentUser } = useContext(UserContext);
  const [ratingData, setRatingData] = useState(null);
  const { rating_id } = useParams();
  const navigate = useNavigate();
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }

  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ratingDetails = await HappyHourApi.getRatingById(rating_id);
        setRatingData(ratingDetails);
        if (ratingDetails) {
          const { rating } = ratingDetails;
          setRating(rating.rating.toString());
        }
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };
  
    fetchData();
  }, [rating_id]);



  const handleChange = (e) => {
    const { value } = e.target;
    setRating(value)
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!(currentUser.username === ratingData.rating.username)) {
      console.error("Unauthorized: Logged-in user access required");
      return;
    }

    try {
      await update("rating", rating_id, {
        rating: rating
      }, currentUser.username);

      navigate(`/ratings/spaces/${ratingData.rating.title}`);
    } catch (error) {
      console.error('Error updating comment', error);
    }
  };

  const handleDelete = async () => {

    if (!(currentUser.username === ratingData.rating.username)) {
        console.error("Unauthorized: logged in user access required");
        return;
      }
    try {
      await remove(`ratings/${rating_id}`);
      navigate(`/ratings/spaces/${ratingData.rating.title}`);

    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>

      {ratingData ? (
        <>
              <h1 style={textColor}>{ratingData.rating.title}</h1>
              <h2>Edit {ratingData.rating.username}'s Rating?</h2>
      <form onSubmit={handleSubmit}>
       <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          name="rating"
          value={rating}
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
      <button onClick={(e) => { e.preventDefault(); handleDelete(); }} className="btn btn-dark">Delete</button>
        </>
      ): (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default RatingEdit;



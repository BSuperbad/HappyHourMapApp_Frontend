import { useState, useEffect } from "react";
import HappyHourApi from "../api/backendApi.js";

const useFetchAvgRating = (title) => {
  const [avgRating, setAvgRating] = useState(null);

  useEffect(() => {
    const getAvgRating = async () => {
      try {
        const avg = await HappyHourApi.getAvgRating(title);
        setAvgRating(avg);
      } catch (e) {
        console.error("Error getting avg rating", e);
      }
    };
    getAvgRating();
  }, [title]);

  return avgRating;
};

export default useFetchAvgRating;

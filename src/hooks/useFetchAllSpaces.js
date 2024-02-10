import { useState, useEffect } from "react";
import HappyHourApi from "../api/backendApi.js";

const useFetchAllSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const response = await HappyHourApi.request('spaces');
        const fetchedSpaces = response.spaces;
        console.log(fetchedSpaces)

        if (!Array.isArray(fetchedSpaces)) {
          console.error('Invalid response format. Expected an array of spaces.');
          return;
        }

        setSpaces(fetchedSpaces);
      } catch (error) {
        console.error("Error fetching space info", error);
      }
    };

    getSpaces();
  }, []);

  return spaces;
};

export default useFetchAllSpaces;

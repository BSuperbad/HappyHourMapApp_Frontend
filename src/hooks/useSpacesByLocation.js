import { useEffect, useState } from "react";
import HappyHourApi from "../api/backendApi.js";

const useSpacesByLocation = (city, neighborhood) => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpacesByLocation = async () => {
      try {
        const spacesData = await HappyHourApi.findAllSpaces({city, neighborhood});
        setSpaces(spacesData.spaces);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpacesByLocation();
  }, [city, neighborhood]);

  return { spaces, loading };
};

export default useSpacesByLocation;

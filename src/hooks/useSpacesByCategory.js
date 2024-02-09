import { useEffect, useState } from "react";
import HappyHourApi from "../api/backendApi.js";

const useSpacesByCategory = (cat_type) => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpacesByCategory = async () => {
      try {
        const spacesData = await HappyHourApi.findAllSpaces({category: cat_type});
        console.log(spacesData.spaces)
        setSpaces(spacesData.spaces);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpacesByCategory();
  }, [cat_type]);

  return { spaces, loading };
};

export default useSpacesByCategory;

import { useState, useEffect } from "react";
import HappyHourApi from "../api/backendApi.js";

const useFetchSpace = (title) => {
  const [space, setSpace] = useState(null);

  useEffect(() => {
    const getSpaceInfo = async () => {
      try {
        const spaceData = await HappyHourApi.getSpace(title);
        setSpace(spaceData);
      } catch (error) {
        console.error("Error fetching space info", error);
      }
    };

    getSpaceInfo();
  }, [title]);

  return space;
};

export default useFetchSpace;

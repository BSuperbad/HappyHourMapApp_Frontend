import { useState, useEffect } from "react";
import HappyHourApi from "../api/backendApi.js";

const useCheckLikedStatus = (title, currentUser) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getLikedSpaceInfo = async () => {
      try {
        const userLikedSpaces = await HappyHourApi.getLikedSpaces(currentUser.username);
        if (userLikedSpaces.length > 0) {
          const likedSpaceTitles = userLikedSpaces.map((s) => s.title);
          setIsLiked(likedSpaceTitles.includes(title));
        } else {
          setIsLiked(false);
        }
      } catch (e) {
        console.error("Error fetching liked spaces", e);
      }
    };
    getLikedSpaceInfo();
  }, [title, currentUser]);

  return isLiked;
};

export default useCheckLikedStatus;

import { useEffect, useState } from "react";
import HappyHourApi from "../api/backendApi.js";

const useLikeSpace = (currentUser, title) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(()=>{
    const checkLikedStatus = async () => {
      try{
        const userLikedSpaces = await HappyHourApi.getLikedSpaces(currentUser.username);
        const likedSpaceTitles = userLikedSpaces.map((s)=>s.title);
        setIsLiked(likedSpaceTitles.includes(title));
      } catch (e){
        console.error("Error fetching liked spaces", e);
      }
    };
    checkLikedStatus();
  }, [currentUser.username, title])

  const handleLikeClick = async () => {
    try {
      console.log("handling like click")
      if (currentUser) {
        if(isLiked){
           await HappyHourApi.remove(`users/${currentUser.username}/like/${title}`);
        } else {
         await HappyHourApi.likeSpace(currentUser.username, title);
        }
      setIsLiked(!isLiked)
      }
    } catch (error) {
      console.error("Error liking/unliking space", error);
    }
  };

  return { isLiked, handleLikeClick };
};

export default useLikeSpace;

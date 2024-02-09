import { useState, useEffect } from "react";
import HappyHourApi from "../api/backendApi.js";

const useMarkSpaceVisited = (currentUser, title) => {
  const [visited, setVisited] = useState(false);
  const [visitDate, setVisitDate] = useState(null);


  const formatVisitDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  useEffect(()=>{
    const checkVisitStatus = async () => {
        try {
          if (currentUser) {
            const userVisitedSpaces = await HappyHourApi.getVisited(currentUser.username);
            if (userVisitedSpaces.length > 0) {
              const visitedSpace = userVisitedSpaces.find((s) => s.title === title);
              if (visitedSpace) {
                setVisited(true);
                setVisitDate(formatVisitDate(visitedSpace.visit_date));
              } else {
                setVisited(false);
              }
            } else {
              setVisited(false);
            }
          }
          } catch (e) {
            console.error("Error fetching visited spaces", e);
          }
    };
    checkVisitStatus();
  }, [currentUser, title]);


  const handleVisitClick = async () => {
    try {
      if (currentUser) {
        await HappyHourApi.markVisited(currentUser.username, title);

          setVisited(true);
          setVisitDate(formatVisitDate(new Date()));
        }

    } catch (error) {
      console.error("Error visiting space", error);
    }
  };

  return { visited, visitDate, handleVisitClick };
};

export default useMarkSpaceVisited;



import { useState, useEffect } from "react";
import HappyHourApi from "../api/backendApi.js";

const useCheckVisitedStatus = (title, currentUser) => {
  const [visited, setVisited] = useState(false);
  const [visitDate, setVisitDate] = useState(false);

  useEffect(() => {
    const getVisitedSpaceInfo = async () => {
      try {
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
      } catch (e) {
        console.error("Error fetching visited spaces", e);
      }
    };
    getVisitedSpaceInfo();
  }, [title, currentUser]);

  const formatVisitDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return { visited, visitDate };
};

export default useCheckVisitedStatus;

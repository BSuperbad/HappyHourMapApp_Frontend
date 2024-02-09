import React, { useState, useEffect } from "react";
import HappyHourApi from "../api/backendApi.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import SpaceCard from "../spaces/SpaceCard.js";
import { Link, useParams } from "react-router-dom";

// Shows a list of spaces that a user has either marked as visited or marked as liked. or both!

const UserSpacesList = ({remove}) => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const { username } = useParams();
  const [userSpaces, setUserSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitedResponse = await HappyHourApi.getVisited(username);
        const likedResponse = await HappyHourApi.getLikedSpaces(username);

        if (visitedResponse && likedResponse) {
          const mergedSpacesList = mergeSpaces(visitedResponse, likedResponse);
          setUserSpaces(mergedSpacesList);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);


  const mergeSpaces = (visitedSpaces, likedSpaces) => {
    // Create a map to store unique spaces based on title
    const uniqueSpacesMap = new Map();

    // Add visited spaces to the map
    visitedSpaces.forEach((space) => {
      uniqueSpacesMap.set(space.title, { ...space, visited: true });
    });

    // Add liked spaces to the map or update existing entries
    likedSpaces.forEach((space) => {
      if (uniqueSpacesMap.has(space.title)) {
        uniqueSpacesMap.set(space.title, { ...uniqueSpacesMap.get(space.title), liked: true });
      } else {
        uniqueSpacesMap.set(space.title, { ...space, liked: true });
      }
    });

    // Convert the map values back to an array
    const mergedSpacesList = Array.from(uniqueSpacesMap.values());

    return mergedSpacesList;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={textColor}>Your Spaces</h1>
      {userSpaces.length === 0 ? (
        <p>You haven't visited or liked any spaces yet. Go explore!</p>
      ) : (
        <ul>
          <div>
            {userSpaces.map((s) => (
              <div> 
              <SpaceCard 
                  key={s.space_id}
                  title={s.title}
                  description={s.description}
                  category={s.cat_type}
                  address={s.address}
                  est_year={s.est_year}
                  city={s.city}
                  neighborhood={s.neighborhood}
                  liked={s.liked}
                  visited={s.visited}
                  remove={remove}
                />
              </div>
            ))}
            </div>
            </ul>
      )}
      <Link to="/spaces">
        <button className="btn btn-light">Spaces</button>
      </Link>
    </div>
  );
};

export default UserSpacesList;

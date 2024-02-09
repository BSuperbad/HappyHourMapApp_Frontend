import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import HappyHourApi from "../api/backendApi.js";
import UserContext from "../context/UserContext.js";

/** User Detail page.
 *
 * Renders information about a user.
 *
 * Routed at /users/:username
 *
 * Routes -> UserDetail
 * 
 * Only admins or logged-in current user can access
 */

const UserDetail = ()=> {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const { username } = useParams();
  const {currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [goodToGo, setGoodToGo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser && (currentUser.isAdmin || currentUser.username === username)) {
        const userPage = await HappyHourApi.getUser(username);
        setUser(userPage);
        } else {
          setGoodToGo(false)
        }
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };
    
  
    fetchData();
  },  [username, currentUser]);

  useEffect(() => {
    if (currentUser.username === username) {
      setGoodToGo(true);
    } else if (currentUser.isAdmin === true) {
      setGoodToGo(true);
    } else {
      setGoodToGo(false);
    }
  }, [username, currentUser]);


  const sameUserOrAdmin = ()=> {
    if (user) {
    return (
      <div>
        <h1 style={textColor}>{user.username} Profile</h1>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <Link style={{color: "#f4978e"}} to={`/comments/users/${user.username}`}>
        <p>{user.username}'s Comments</p>
      </Link>
      <Link style={{color: "#f4978e"}} to={`/users/${user.username}/spaces`}>
      <p>{user.username}'s Liked & Visited Spaces</p>
      </Link>
      <Link to={`/users/${user.username}/edit`}>
        <button className="btn btn-light">Edit Profile</button>
      </Link>
    </div>
    )
  } else {
    return <div>Loading user info....</div>
  }
}
  const anon = ()=> {
    return (
      <div>
        <p>You must be an admin or the current user to see this page.</p>
      </div>
    );
  }

 return (
  <div>
    {goodToGo ? sameUserOrAdmin() : anon()}
    </div>
  );
  
  
}

export default UserDetail;

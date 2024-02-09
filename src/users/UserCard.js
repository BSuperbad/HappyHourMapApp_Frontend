import React from "react";
import { Link } from "react-router-dom";

/** Show info about user
 * 
 * Rendered by UsersList to show UserCard for each space.
 * 
 * UsersList -> UserCard
 * 
 */

const UserCard = ({username, firstName, lastName, email, isAdmin}) => {
    console.debug("UserCard", username);
    if (!username) {
        console.error("Username is undefined or null.");
      }
    return (
        <div>
            <Link style={{color: "#f4978e"}} to={`/users/${username}`}>
                <h6>{username}: {firstName} {lastName}</h6>
            </Link>
            <p>Email: {email}</p>
            {isAdmin ? (
                <p>Admin: Yes</p>
            ) : (
                <p>Admin: No</p>
            )}
        </div>
        
    )
};

export default UserCard;
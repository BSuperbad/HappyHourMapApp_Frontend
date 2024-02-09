import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../common/LoadingSpinner.js";
import HappyHourApi from "../api/backendApi.js";
import UserCard from "./UserCard.js";
import UserContext from "../context/UserContext.js";

/** Show page with list of users.
 * 
 * Private Route only for admin users
 *
 * On mount, loads users from API.
 *
 * This is routed to at /users
 *
 * Routes -> { UserCard }
 */

const UsersList =()=> {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  console.debug("UsersList");
  const {currentUser} = useContext(UserContext);

  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getUsersList = async () => {
    try{
        let userData = await HappyHourApi.request("users");
        setUsers(userData.users);
    } catch (e) {
        console.error("Error fetching users", e)
    }
    };
    getUsersList();
  }, []);

  if (!users) return <LoadingSpinner />;


const currentAdmin = () => {
    return (
        <div>
          <h1 style={textColor}>Users List</h1>
                  <div>
                      {users.map((u) => (
                        <UserCard
                            key={u.user_id}
                            username={u.username}
                            firstName={u.firstName}
                            lastName={u.lastName}
                            email={u.email}
                            isAdmin={u.isAdmin}
                        />
              ))}
          </div>
        </div>
    );
}
const nonAdmin = () => {
    return (
        <div>
            <p>You must be an admin to see all users</p>
        </div>
    )
}
if (!users)  return <LoadingSpinner/>;
  return (
    <div>
        {currentUser.isAdmin ? currentAdmin() : nonAdmin()}
    </div>
  );
}

export default UsersList;

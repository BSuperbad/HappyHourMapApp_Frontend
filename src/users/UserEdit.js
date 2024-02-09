import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import HappyHourApi from "../api/backendApi.js";

// Form to update or delete a space

// Admin only

const UserEdit = ({ update, remove }) => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  console.debug("UserEdit")
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null)
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!(currentUser.isAdmin || currentUser.username === username)) {
          console.error("Unauthorized: Admin access required");
          // Optionally, you can redirect the user or display an error message
          return;
        }
        const userPage = await HappyHourApi.getUser(username);
        setUser(userPage);
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };
    
  
    fetchData();
  },  [username, currentUser]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", 
    email: "" 
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "", 
        email: user.email || ""
      });
    }
  }, [user, currentUser, username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(currentUser.isAdmin || currentUser.username === username) ) {
      console.error("Unauthorized: Admin or logged-in user access required");
      return;
    }

    try {
      await update("user", username, {
        email : formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }, currentUser.token);
      
      navigate("/");
    } catch (error) {
      console.error('Profile update failed', error);
    }
  };

  const handleDelete = async () => {
    if (!(currentUser.isAdmin || currentUser.username === username)) {
      console.error("Unauthorized: Admin or logged-in user access required");
      return;
    }

    try {
      await remove(`users/${username}`);
      navigate("/");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const adminOrUser = () =>{
    return (
      <div>
    <h1 style={textColor}>Edit {username}'s Profile?</h1>
       <form onSubmit={handleSubmit}>

        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br/>
        <button className="btn btn-light">Submit</button>
      </form>
       <button className="btn btn-dark" onClick={(e) => { e.preventDefault(); handleDelete(); }}>Delete</button>

     </div>
    )
  }

  const noAccess = () => {
    return (
      <div>
        <p>You must be an admin or logged in as {username} to access!</p>
      </div>
    )
  }

  return (
    <div>
      {(!(currentUser.isAdmin || currentUser.username === username))
      ?
    noAccess()
  :
  adminOrUser()}
    </div>
   );
};

export default UserEdit;



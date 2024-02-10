import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import MapComponent from "../map/MapComponent.js";

const Home = () => {
    const {currentUser} = useContext(UserContext);
  

    const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }

    const loggedInHomepage = ()=> {
        return(
            <div>
                <h2>Welcome back, {currentUser.username}</h2>
                <Link to="/spaces" style={{color: "#f4978e"}}>
                <h2>Explore Spaces</h2> 
                </Link>
                <MapComponent />
            </div>
        )
    };
    const anonHomepage = ()=> {
        return (
            <div>
                <h2 style={{color: "#f4978e"}}>
                <Link to="/signup" style={{color: "#f4978e"}}>Sign up</Link> or <Link to="/login" style={{color: "#f4978e"}}>Login</Link> to Explore!</h2>
            </div>
        )
    };
return (
    <>
    <h1 style={textColor}>Welcome to all the spaces Bells+Whistles ever designed</h1>
    {currentUser ? loggedInHomepage() : anonHomepage()}
    </>
)
}
export default Home;
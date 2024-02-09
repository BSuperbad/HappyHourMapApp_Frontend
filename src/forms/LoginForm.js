import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../spaces/Spaces.css";

const LoginForm = ({login}) => {
    const navigate = useNavigate();

    const INITIAL_STATE = {
        username: "",
        password: ""
    };
    const [formData, setFormData ] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data=> ({
            ...data,
            [name] : value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { username, password } = formData;
          const loginSuccess = await login(username, password);
          setFormData(INITIAL_STATE)
          if(loginSuccess) {
            navigate("/spaces");
            setError(null);
            setLoggedIn(true)
          } else {
            setError("Invalid credentials. Please try again");
          }
         
        } catch (error) {
          console.error('Login failed:', error);
          setError("Invalid credentials. Please try again.")
        }
      };
    return (
        <div>
            {loggedIn ? (
                <p>Login succcssful. Redirecting...</p>
            ) : (

            <div>
        <h1 style={{ color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
            id="username" 
            type="text" 
            name="username"
            value={formData.username} 
            onChange={handleChange}
            />
            <br/>
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            name="password"
            id="password" value={formData.password} 
            onChange={handleChange}
            />
            <br/>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="btn btn-light">Submit</button>
        </form>
        </div>
                    )}
                    </div>
    )
}

export default LoginForm;
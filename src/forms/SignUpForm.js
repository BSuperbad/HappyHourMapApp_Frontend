import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();

  const INITIAL_STATE = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: ""

};
  const [formData, setFormData] = useState(INITIAL_STATE);

/** Update form data field */
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData(data=> ({
        ...data,
        [name] : value
    }))
}
 /** Handle form submit:
   *
   * Calls signup func prop and, if successful, redirect to /spaces.
   */


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const {username, email, password, firstName, lastName} = formData;
    try {
        await signup({
            username,
            email,
            password,
            firstName,
            lastName
        });
        navigate("/spaces");
        setFormData(INITIAL_STATE);
    }catch(error){
        console.error("Registration failed", error)
    }

  };

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
  );



  return (
    <div>
    <h1 style={{ color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Sign Up</h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor="username">Username </label>
    <input 
    id="username" 
    type="text" 
    name="username"
    value={formData.username} 
    onChange={handleChange}
    />
    <br/>

    <label htmlFor="password">Password </label>
    <input 
    type="password" 
    name="password"
    id="password" value={formData.password} 
    onChange={handleChange}
    />
<br/>
    <label htmlFor="firstName">First name </label>
    <input 
    type="text" 
    name="firstName"
    id="firstName" value={formData.firstName} 
    onChange={handleChange}
    />
<br/>
    <label htmlFor="lastName">Last name </label>
    <input 
    type="text" 
    name="lastName"
    id="lastName" value={formData.lastName} 
    onChange={handleChange}
    />
<br/>
    <label htmlFor="email">Email </label>
    <input 
    type="email" 
    name="email"
    id="email" value={formData.email} 
    onChange={handleChange}
    />
    <br/>
    <button className="btn btn-light">Submit</button>
</form>
</div>
  );
}

export default SignupForm;
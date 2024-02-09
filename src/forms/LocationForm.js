import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";

/** Add a new location form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /categories/newCatType route
 *
 * Routes -> LocationForm -> LocationsList
 * Routed as /locations/new
 */

const LocationForm = ({create}) => {
  const {currentUser} = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }

  const INITIAL_STATE = {
    city: "",
    neighborhood: ""

};
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData(data=> ({
        ...data,
        [name] : value
    }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!currentUser.isAdmin) {
        console.error("Unauthorized: Admin access required");
        return;
      }
      const { city: newCity, neighborhood: newNeighborhood} = formData;
    try {
        await create("location", formData, {
          city: newCity, 
          neighborhood: newNeighborhood
        });
        setFormData(INITIAL_STATE);
        setError(null);
        navigate(`/locations`);
    }catch(error){
      setError(`${formData.city}, ${formData.neighborhood} already exists.`);
    }

  };

  console.debug(
      "LocationForm",
      "formData=", formData,
  );



  return (
    <div>
    <h1 style={textColor}>Add New Location</h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor="city">City</label>
    <input 
    id="city" 
    type="text" 
    name="city"
    value={formData.city} 
    onChange={handleChange}
    />
    <br/>
    <label htmlFor="neighborhood">Neighborhood</label>
    <input 
    id="neighborhood" 
    type="text" 
    name="neighborhood"
    value={formData.neighborhood} 
    onChange={handleChange}
    />
    <br/>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <button className="btn btn-light">Submit</button>
</form>
</div>
  );
}

export default LocationForm;
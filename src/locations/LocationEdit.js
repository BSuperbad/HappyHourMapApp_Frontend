import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import HappyHourApi from "../api/backendApi.js";

// Form to update or delete a location

// Admin only

const LocationEdit = ({ update, remove }) => {
  const { currentUser } = useContext(UserContext);
  const { city, neighborhood } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const INITIAL_STATE = {
    city: city,
    neighborhood: neighborhood
  };
    const [formData, setFormData] = useState(INITIAL_STATE);
  const [locationId, setLocationId] = useState(null);

  const handleDelete = async () => {
    if (!currentUser.isAdmin) {
        console.error("Unauthorized: Admin access required");
        return;
      }
    try {
      await remove(`locations/neighborhoods/${neighborhood}`);
      navigate('/locations')
      setError(null)

    } catch (error) {
      console.error("Delete failed", error);
      setError(`Cannot delete ${city}, ${neighborhood}! There are spaces associated with it!`);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await HappyHourApi.getLocation(neighborhood);
        const location = locationData.location[0];
        setFormData({
          city: location.city,
          neighborhood: location.neighborhood
        });
        setLocationId(location.loc_id);
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    };
  
    fetchLocation();
  }, [neighborhood]);
  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser.isAdmin) {
      console.error("Unauthorized: Admin access required");
      return;
    }

    try {
      const { city: newCity, neighborhood: newNeighborhood } = formData;
      await update("location", locationId, { 
        city: newCity, 
        neighborhood: newNeighborhood 
      });
      setFormData(INITIAL_STATE);
      setError(null)
      navigate(`/locations`);
      
    } catch (error) {
      console.error("Update failed", error);
      setError(`${formData.city}, ${formData.neighborhood} already exists.`);
    }
  };



  return (
    <div>
       <h1 style={textColor}>Edit {city}, {neighborhood}?</h1>
       <form onSubmit={handleSubmit}>
         <label htmlFor="city">City</label>
         <input
           type="text"
           name="city"
           id="city"
           value={formData.city}
           onChange={handleChange}
         />
         <label htmlFor="neighborhood">Neighborhood</label>
         <input
           type="text"
           name="neighborhood"
           id="neighborhood"
           value={formData.neighborhood}
           onChange={handleChange}
         />
         {error && <p style={{ color: "red" }}>{error}</p>}
         <button className="btn btn-light">Submit</button>
       </form>
       <button onClick={(e) => { e.preventDefault(); handleDelete(); }} className="btn btn-dark">Delete</button>

     </div>
   );
};

export default LocationEdit;

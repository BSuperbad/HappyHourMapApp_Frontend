import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import HappyHourApi from "../api/backendApi.js";

// For adding a new space
// Admin only

const SpaceForm = ({create}) => {
  const { currentUser } = useContext(UserContext);
  const [categoriesList, setCategoriesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const INITIAL_STATE = {
      title: "",
      description: "",
      image_url: "",
      category_id: "",
      address: "",
      location_id: "",
      est_year: ""
  }

  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await HappyHourApi.request("categories");
        setCategoriesList(categoriesData.categories);
  
        const locationsData = await HappyHourApi.request("locations");
        setLocationsList(locationsData.locations);
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const integerValue = name === 'category_id' ? parseInt(value, 10) : value;
    setFormData((data) => ({
      ...data,
      [name]: integerValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser.isAdmin) {
      console.error("Unauthorized: Admin access required");
      return;
    }

    try {
      await create("space", {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        category_id: formData.category_id,
        address: formData.address,
        location_id: formData.location_id,
        est_year: formData.est_year,
      }, currentUser.token);
      setFormData(INITIAL_STATE);
      setError(null);
      navigate("/spaces");
    } catch (error) {
      setError(`A space by the name of ${formData.title} already exists.`)
    }
  };

  return (
    <div>
      <h1 style={textColor}>Add a New Space</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor="image_url">Image</label>
        <input
          type="text"
          name="image_url"
          id="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor="category_id">Category</label>
        <select
          name="category_id"
          id="category_id"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">Select a Category</option>
          {categoriesList.map((c) => (
          <option key={c.cat_id} value={c.cat_id}>
          {c.cat_type}
          </option>
          ))}
        </select>
        <br/>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br/>
        <label htmlFor="location_id">Location</label>
        <select
          name="location_id"
          id="location_id"
          value={formData.location_id}
          onChange={handleChange}
          >
          <option value="">Select a Location</option>
          {locationsList.map((l) => (
          <option key={l.loc_id} value={l.loc_id}>
          {l.city}, {l.neighborhood}
          </option>
          ))}
        </select>
        <br/>
        <label htmlFor="est_year">Year Established</label>
        <input
          type="text"
          name="est_year"
          id="est_year"
          value={formData.est_year}
          onChange={handleChange}
        />
        <br/>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="btn btn-light">Submit</button>
      </form>
    </div>
  );
};

export default SpaceForm;



  
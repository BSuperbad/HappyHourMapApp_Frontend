import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";

// Form to update or delete a category

// Admin only

const CategoryEdit = ({ update, remove }) => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const { currentUser } = useContext(UserContext);
  const { cat_type } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const INITIAL_STATE = {
    cat_type: cat_type,
  };

  const handleDelete = async () => {
    if (!currentUser.isAdmin) {
        console.error("Unauthorized: Admin access required");
        return;
      }
    try {
      await remove(`categories/${cat_type}`);
      navigate('/categories')
      setError(null)

    } catch (error) {
      console.error("Delete failed", error);
      setError(`Cannot delete ${cat_type}! There are spaces associated with it!`);
    }
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

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
    

    const { cat_type: newCat_type } = formData;
    try {
      await update("category", cat_type, {
        cat_type: newCat_type,
      });
      setFormData(INITIAL_STATE);
      setError(null);
      navigate(`/categories`);
    } catch (error) {
        setError(`${formData.cat_type} already exists.`);
    }
  };



  return (
    <div>
       <h1 style={textColor}>Edit {cat_type}?</h1>
       <form onSubmit={handleSubmit}>
         <label htmlFor="cat_type">Category</label>
         <input
           type="text"
           name="cat_type"
           id="cat_type"
           value={formData.cat_type}
           onChange={handleChange}
         />
         {error && <p style={{ color: "red" }}>{error}</p>}
         <button className="btn btn-light">Submit</button>
       </form>
       <button className="btn btn-dark" onClick={(e) => { e.preventDefault(); handleDelete(); }}>Delete</button>

     </div>
   );
};

export default CategoryEdit;

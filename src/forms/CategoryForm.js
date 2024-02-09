import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";

/** Add a new category form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /categories/newCatType route
 *
 * Routes -> CategoryForm -> CategoriesList
 * Routed as /categories/new
 */

const CategoryForm = ({create})=> {
  const {currentUser} = useContext(UserContext)
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const INITIAL_STATE = {
    cat_type: ""

};
  const [formData, setFormData] = useState(INITIAL_STATE);

/** Update form data field */
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
      const { cat_type: newCat_type } = formData;
    try {
      await create("category", formData, {
        cat_type: newCat_type,
      });
      setFormData(INITIAL_STATE);
      setError(null);
      navigate(`/categories`);
    } catch (error) {
      setError(`${formData.cat_type} already exists.`);
    }
};

  console.debug(
      "CategoryForm",
      "formData=", formData.cat_type,
  );



  return (
    <div>
    <h1 style={textColor}>Add a New Category</h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor="cat_type">New Category</label>
    <input 
    id="cat_type" 
    type="text" 
    name="cat_type"
    value={formData.cat_type} 
    onChange={handleChange}
    />
    <br/>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <button className="btn btn-light">Submit</button>
</form>
</div>
  );
}

export default CategoryForm; 
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import HappyHourApi from "../api/backendApi.js";
import CategoryCard from "./CategoryCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import UserContext from "../context/UserContext.js";

/** Show page with list of categories to choose from.
 *
 * On mount, loads categories from API.
 *
 * This is routed to at /categories
 *
 * Routes -> { CategoryCard}
 */

function CategoriesList() {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  console.debug("CategoriesList");
  const {currentUser} = useContext(UserContext)
  const [categories, setCategories] = useState(null);

  useEffect(() => {
  const getCategories = async () => {
    try {
        const categoriesData = await HappyHourApi.request("categories");
        setCategories(categoriesData.categories);
    }catch(e){
        console.error("Error fetching categories:", e)
    }
  };
  getCategories();
}, []);

  if (!categories) return <LoadingSpinner />;

  return (
      <div>
        <h1 style={textColor}>List of Categories of Spaces</h1>
        {categories.length
            ? (
                <div>
                  {categories.map(c => (
                      <CategoryCard
                          key={c.cat_id}
                          type={c.cat_type}
                      />
                  ))}
                </div>
            ) : (
                <p>Sorry, no results were found!</p>
            )}
            {currentUser.isAdmin 
            ?
            <Link to="/categories/new">
              <button className="btn btn-light">Add New Category</button>
            </Link>
            :
            null}
            
      </div>
  );
}

export default CategoriesList;

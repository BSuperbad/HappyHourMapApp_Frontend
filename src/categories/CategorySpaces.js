import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import SpaceCard from "../spaces/SpaceCard.js";
import UserContext from "../context/UserContext.js";
import useSpacesByCategory from "../hooks/useSpacesByCategory.js";

/** Spaces of Category page.
 *
 * Renders list of spaces that fall under category type.
 *
 * Routed at /categories/:cat_type
 *
 * Routes -> CategorySpaces
 */

const CategorySpaces = ()=> {
  const { cat_type } = useParams();
  console.debug("CategorySpaces", "cat_type=", cat_type);
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const { currentUser } = useContext(UserContext);
  const {spaces, loading} = useSpacesByCategory(cat_type);

  const withoutSpaces = () => {
    return (
      <div>
      <h1 style={textColor}>No {cat_type} Spaces...yet</h1>
      </div>
    )
  };
  const withSpaces = ()=>{
    return (
      <div>
       <h1 style={textColor}>{cat_type} Spaces</h1>
            <div>
              {spaces.map((s) => (
                <SpaceCard
                  key={s.space_id}
                  title={s.title}
                  description={s.description}
                  address={s.address}
                  est_year={s.est_year}
                />
              ))}
            </div>
      </div>
    )
  }



  return (
    <div>
            {loading && <p>Loading...</p>}
            {!loading && (spaces ? withSpaces() : withoutSpaces())}
  
      {currentUser.isAdmin && (
        <Link to={`/categories/${cat_type}/edit`}>
          <button className="btn btn-light">Edit {cat_type} Category</button></Link>
      )}
    </div>
  );
};  

export default CategorySpaces;



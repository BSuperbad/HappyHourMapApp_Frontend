import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({type}) => {
    console.debug("CategoryCard");
return (
    <Link style={{color: "#f4978e"}} to={`/categories/${type}`}>
        <h6>{type} Spaces</h6>
    </Link>
)

};

export default CategoryCard;
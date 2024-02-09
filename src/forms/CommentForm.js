import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import HappyHourApi from "../api/backendApi.js";

/** Add a new COMMENT form.
 *
 * Routes -> CommentForm -> Comments
 * Routed as /locations/new
 * must be logged in
 */

const CommentForm = ()=> {
    const {currentUser} = useContext(UserContext)
    const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const navigate = useNavigate();
  const { username, title } = useParams()

  const INITIAL_STATE = {
    comment: ""

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
    if (!currentUser) {
        console.error("Unauthorized: Must be logged in to leave a comment!");
        return;
      }
      const { comment } = formData;
    try {
        await HappyHourApi.addComment(username, title,{
            comment
        });
        navigate(`/comments/spaces/${title}`);
        setFormData(INITIAL_STATE);
    }catch(error){
        console.error("Failed to add new comment", error)
    }

  };

  console.debug(
      "CommentForm",
      "formData=", formData,
  );



  return (
    <div>
    <h1 style={textColor}>Add New Comment for Space: {title}</h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor="comment">Comment</label>
    <input 
    id="comment" 
    type="text" 
    name="comment"
    value={formData.comment} 
    onChange={handleChange}
    />
    <br/>
    <button className="btn btn-light">Submit</button>
</form>
</div>
  );
}

export default CommentForm;
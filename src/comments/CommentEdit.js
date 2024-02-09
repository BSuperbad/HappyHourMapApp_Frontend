import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import HappyHourApi from "../api/backendApi.js";

const CommentEdit = ({update, remove}) => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  console.debug("CommentEdit");

  const { currentUser } = useContext(UserContext);
  const [commentData, setCommentData] = useState(null);
  const { comment_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentPage = await HappyHourApi.getComment(comment_id);
        setCommentData(commentPage);
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };

    fetchData();
  }, [comment_id]);

  const [formData, setFormData] = useState({
    comment: ""
  });

  useEffect(() => {
    if (commentData) {
      setFormData({
        comment: commentData.comment.comment || ""
      });
    }
  }, [commentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(currentUser.isAdmin || currentUser.username === commentData.comment.username)) {
      console.error("Unauthorized: Admin or logged-in user access required");
      return;
    }

    try {
      await update("comment", comment_id, {
        comment: formData.comment
      });

      navigate(`/comments/spaces/${commentData.comment.title}`);
    } catch (error) {
      console.error('Error updating comment', error);
    }
  };

  const handleDelete = async () => {
    if (!(currentUser.isAdmin || currentUser.username === commentData.comment.username)) {
        console.error("Unauthorized: Admin access required");
        return;
      }
    try {
      await remove(`comments/${comment_id}`);
      navigate(`/comments/spaces/${commentData.comment.title}`);

    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <h1 style={textColor}>Edit {commentData?.comment.username}'s Comment?</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          name="comment"
          id="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <button className="btn btn-light">Submit</button>
      </form>
      <button className="btn btn-dark" onClick={(e) => { e.preventDefault(); handleDelete(); }}>Delete</button>
    </div>
  );
};

export default CommentEdit;

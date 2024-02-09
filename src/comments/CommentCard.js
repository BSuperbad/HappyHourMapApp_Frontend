import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.js";

/** Show info about comment
 * 
 * Rendered by either UserCommentList OR SpaceCommentList to show CommentCard for each comment.
 * 
 * UserCommentList -> CommentCard
 * OR
 * SpaceCommentList -> CommentCard
 * 
 * Again, must be logged in to see
 */

const CommentCard = ({title, comment_id, comment, commentDate, username, isUserComment}) => {
    console.debug("CommentCard");
    const {currentUser } = useContext(UserContext);
    const formatDate = (dateString) => {
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        };
        return new Date(dateString).toLocaleString(undefined, options);
      };
    if (!username) {
        console.error("Username is undefined or null.");
      }
    const UserComments = () => {
        return (
            <div>
                <Link style={{color: "#f4978e"}} to={`/spaces/${title}`}>
                <h3>Space: {title}</h3>
                </Link>
                <div style={{ fontStyle: 'italic' }}>"{comment}"
                 <p style={{fontSize: 'small'}}>{formatDate(commentDate)}</p>
                 </div>
            </div>
        )
    }
    const SpaceComments = () => {
        return (
            <div>
                 <div style={{ fontStyle: 'italic' }}>"{comment}"
                 <p style={{fontSize: 'small'}}>On: {formatDate(commentDate)}</p>
                 </div>
                <p>By: {username}</p>
            </div>
        )
    }
    return (
        <div>
           {isUserComment ? UserComments() : SpaceComments()}
           {currentUser.username === username || currentUser.isAdmin?
                <Link to={`/comments/${comment_id}/edit`}>
                    <button className="btn btn-light">Edit Comment</button>
                    </Link>
                    :
                    null
                    }
        </div>
        
    )
};

export default CommentCard;
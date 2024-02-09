import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HappyHourApi from "../api/backendApi.js";
import CommentCard from "./CommentCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";

/** Show page with list of comments by a user
 * 
 * loads comments by a user from HappyHour API.
 * 
 * Routed to /comments/users/:username
 * Routes -> { CommentCard }
 */

const UserCommentsList = () => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
    console.debug("UserCommentsList");
    const {username} = useParams();
    const [userComments, setUserComments] = useState([]);
  
    useEffect(() => {
      const getUserComments = async () => {
        try {
          let userCommentsData = await HappyHourApi.getComments("user", username);
          setUserComments(userCommentsData.comments);
        } catch (error) {
          console.error("Error fetching user comments", error);
        }
      };
      getUserComments();
    }, [username]);


    if (!userComments) return <LoadingSpinner />;

    return (
      <div>
        {userComments.length>0
        ?
        <>
        <h1 style={textColor}>All Comments by {username}</h1>
        <div>
            {userComments.map((uc) => (
              <CommentCard
                  key={uc.comment_id}
                  comment_id={uc.comment_id}
                  title={uc.title}
                  comment={uc.comment}
                  commentDate={uc.comment_date}
                  username={username}
                  isUserComment={true}
              />
    ))}
</div>
</>
:
<>
<h1 style={textColor}>No Comments by {username}... yet</h1>
</>
      }
     
    </div>
      );
      
    }

export default UserCommentsList;

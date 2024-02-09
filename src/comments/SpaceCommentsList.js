import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import HappyHourApi from "../api/backendApi.js";
import CommentCard from "./CommentCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import UserContext from "../context/UserContext.js";

/** Show page with list of comments for a space
 * 
 * loads comments for a space from HappyHour API.
 * 
 * Routed to /comments/spaces/:title
 * Routes -> { CommentCard }
 * Must be logged in to see comments for spaces
 */

const SpaceCommentsList = () => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
    console.debug("SpaceCommentsList");
    const {currentUser} = useContext(UserContext);
    const {title} = useParams();
    const [spaceComments, setSpaceComments] = useState([]);
  
    useEffect(() => {
      const getSpaceComments = async () => {
        try {
          let spaceCommentsData = await HappyHourApi.getComments("space", title);
          setSpaceComments(spaceCommentsData.comments);
        } catch (error) {
          console.error("Error fetching user comments", error);
        }
      };
      getSpaceComments();
    }, [title]);

    if (!spaceComments) return <LoadingSpinner />;

    const loggedIn = () => {
        return (
            <div>
              <h1 style={textColor}>Comments for {title}</h1>
                      <div>
                          {spaceComments.map((sc) => (
                            <CommentCard
                                key={sc.comment_id}
                                comment_id={sc.comment_id}
                                comment={sc.comment}
                                commentDate={sc.comment_date}
                                username={sc.username}
                                isUserComment={false}
                            />
                  ))}
              </div>
              <Link to={`/comments/${currentUser.username}/spaces/${title}/new`}>
                <button className="btn btn-light">Add Comment</button>
              </Link>
            </div>
        );
    }
    const loggedOut = () => {
        return (
            <div>
                <p>You must be logged in to see comments for spaces.</p>
            </div>
        )
    }
    return (
        <div>
            {(currentUser) ? loggedIn() : loggedOut()}
        </div>
      );
      
    }

export default SpaceCommentsList;

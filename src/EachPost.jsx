import { EachPostLi, PostLink } from "./styledComponent";
import React from "react";
// yarn add @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
function EachPost({ title, postID}) {
  const navigate = useNavigate();
  const goPost = () =>{
    navigate(`${'/post/' + postID}`)
  };
  return (
    <EachPostLi onClick={goPost}>
      <div>
        <FontAwesomeIcon icon={faLocationPin} />
        <PostLink>{title}</PostLink>
      </div>
    </EachPostLi>
  );
}

export default EachPost;

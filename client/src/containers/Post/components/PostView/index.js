import React, { useState, useEffect } from 'react'
import { getFormateDate } from '../../../../utils/date'
import like from '../../../../images/like.png'
import likeDefault from '../../../../images/like-default.png'
import unlike from "../../../../images/unlike.png";
import unlikeDefault from "../../../../images/unlike-default.png";
import './style.css'

const PostView = ({ post, editable, voteable, onEditClick, onVoteClick }) => {
  let [voteNumber, setVoteNumber] = useState()
  
  useEffect(() => {
    setVoteNumber(post.votesc.user)
  }, [post])
  
  const handleClick = e => {
    if (voteable && e.target.alt === "voteUp") {
      if (voteNumber === 1) {
        setVoteNumber(0)
        onVoteClick(0)
      } else if (voteNumber !== 1) {
        onVoteClick(1)
        setVoteNumber(1)
      }
    } else if (voteable && e.target.alt === "voteDown") {
      if (voteNumber === -1) {
        setVoteNumber(0)
        onVoteClick(0)
      } else if (voteNumber !== -1) {
        onVoteClick(-1);
        setVoteNumber(-1);
      }
    } else {

    }
  }

  return (
    <div className="postView">
      <div>
        <h2>{post.title}</h2>
        <div className="mark">
          <span className="author">{post.author.username}</span>
          <span>.</span>
          <span>{getFormateDate(post.updateAt)}</span>
          {editable && (
            <span>
              .<button onClick={onEditClick}>编辑</button>
            </span>
          )}
        </div>
        <div className="content">{post.content}</div>
      </div>
      <div className="vote">
        <span>
          <a href="#" type="button" className="voteUp" onClick={handleClick}>
            <img alt="voteUp" src={voteNumber === 1 ? like : likeDefault} />
          </a>
        </span>
        <span>{ post.votesc.up }</span>
        <span>
          <a href="#" type="button" className="voteDown" onClick={handleClick}>
            <img alt="voteDown" src={voteNumber === -1 ? unlike : unlikeDefault} />
          </a>
        </span>
        <span>{post.votesc.total - post.votesc.up}</span>
      </div>
    </div>
  );
}

export default PostView
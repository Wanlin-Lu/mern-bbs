import React from 'react'
import { getFormateDate } from '../../../../utils/date'
import like from '../../../../images/like.png'
import './style.css'

const PostView = ({ post, editable, onEditClick }) => {
  return (
    <div className="postView">
      <div>
        <h2>{post.title}</h2>
        <div className="mark">
          <span className="author">{post.author.username}</span>
          <span>.</span>
          <span>{getFormateDate(post.updateAt)}</span>
          {editable && <span>
            .<button onClick={onEditClick}>编辑</button>
          </span>}
        </div>
        <div className="content">{post.content}</div>
      </div>
      <div className="vote">
        <span>
          <img alt="vote" src={like} />
        </span>
        <span>{post.vote}</span>
      </div>
    </div>
  )
}

export default PostView
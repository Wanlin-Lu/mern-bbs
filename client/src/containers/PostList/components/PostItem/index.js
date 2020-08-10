import React from 'react'
import { getFormateDate } from '../../../../utils/date'
import like from '../../../../images/like.png'
import './style.css'

const PostItem = ({ post }) => (
  <li className="postItem">
    <div className="title">{post.title}</div>
    <div>
      创建人：<span>{post.author.username}</span>
    </div>
    <div>
      更新时间：<span>{getFormateDate(post.updateAt)}</span>
    </div>
    <div className="like">
      <span>
        <img src={like} alt="vote" />
      </span>
      <span>{post.vote}</span>
    </div>
  </li>
)

export default PostItem
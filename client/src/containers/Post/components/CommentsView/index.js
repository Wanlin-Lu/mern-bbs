import React from 'react'
import { getFormateDate } from '../../../../utils/date'
import './style.css'

const CommentsView = ({ comments }) => (
  <ul className="commentsView">
    {comments.map(item => {
      return (
        <li key={item._id}>
          <div>{item.content}</div>
          <div className="sub">
            <span>{item.author.username || ""}</span>
            <span>.</span>
            <span>{getFormateDate(item.updateAt)}</span>
          </div>
        </li>
      )
    })}
  </ul>
)

export default CommentsView;
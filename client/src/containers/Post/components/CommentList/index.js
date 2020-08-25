import React, { useState } from 'react'
import CommentsView from '../CommentsView'
import './style.css'

const CommentList = ({postId, user, comments, editable, onSubmit }) => {
  const [content, setContent] = useState('')

  const handleChange = e => {
    setContent(e.target.value)
  }

  const submitComment = () => {
    const comment = JSON.stringify({
      post: postId,
      author: {
        id: user.userId,
        username: user.username
      },
      content: content,
      updateAt: new Date().getTime()
    })
    onSubmit(comment)
    setContent("")
  }

  return (
    <div className='commentList'>
      <div className="title">评论</div>
      {editable && (
        <div className="editor">
          <textarea
            placeholder="说说你的看法？"
            value={content}
            onChange={handleChange}
          />
          <button onClick={submitComment}>提交</button>
        </div>
      )}
      <CommentsView comments={comments} />
    </div>
  )
}

export default CommentList
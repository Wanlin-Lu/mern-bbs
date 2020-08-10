import React, { useState } from 'react'
import './style.css'

const PostEditor = ({ post, onCancel, onSave }) => {
  const [title, setTitle] = useState(post ? post.title : "")
  const [content, setContent] = useState(post ? post.content : "")

  const handleChange = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else if (e.target.name === 'content') {
      setContent(e.target.value)
    } else {}
  }

  const postSave = () => {
    onSave(title, content)
  }

  return (
    <div className="postEditor">
      <input
        type="text"
        name="title"
        placeholder="标题"
        value={title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="内容"
        value={content}
        onChange={handleChange}
      />
      <button onClick={onCancel}>取消</button>
      <button onClick={postSave}>保存</button>
    </div>
  )
}

export default PostEditor
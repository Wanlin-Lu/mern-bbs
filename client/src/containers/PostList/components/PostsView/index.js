import React from 'react'
import { Link } from 'react-router-dom'
import PostItem from '../PostItem'

const PostsView = ({ posts }) => (
  <ul>
    {posts.map((post) => (
      <Link key={post.id} to={`/posts/${post.id}`}>
        <PostItem post={post} />
      </Link>
    ))}
  </ul>
);

export default PostsView
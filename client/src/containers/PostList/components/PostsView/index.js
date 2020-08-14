import React from 'react'
import { Link } from 'react-router-dom'
import PostItem from '../PostItem'

const PostsView = ({ posts }) => (
  <React.Fragment>
    {posts.length === 0 && <span>还没有帖子，发一个？</span>}
    <ul>
      {posts.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`}>
          <PostItem post={post} />
        </Link>
      ))}
    </ul>
  </React.Fragment>
);

export default PostsView
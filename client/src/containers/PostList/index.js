import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as uiActions, isAddDialogOpen } from '../../redux/modules/ui'
import { actions as postsActions } from '../../redux/modules/posts'
import { getPostListWithAuthors } from '../../redux/modules'
import { getLoggedUser } from '../../redux/modules/auth'

import PostsView from './components/PostsView'
import PostEditor from '../Post/components/PostEditor'
import './style.css'

const PostList = ({user, posts, addDialogOpen, openAddDialog, closeAddDialog, createPost, fetchPostList }) => {

  useEffect(() => {
    fetchPostList()
  }, [fetchPostList])

  const handleSave = data => {
    createPost(data.title, data.content)
  }
  
  return (
    <div className="postList">
      <div>
        <h2>话题列表</h2>
        {user.userId ? (
          <button onClick={openAddDialog}>发帖</button>
        ) : null}
      </div>
      {addDialogOpen && <PostEditor onSave={handleSave} onCancel={closeAddDialog} />}
      <PostsView posts={posts} />
    </div>
  )
}

const mapStateToProps = state => ({
  posts: getPostListWithAuthors(state),
  addDialogOpen: isAddDialogOpen(state),
  user: getLoggedUser(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(postsActions, dispatch),
  ...bindActionCreators(uiActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
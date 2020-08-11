import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useParams } from 'react-router-dom'

import { actions as uiActions, isEditDialogOpen } from '../../redux/modules/ui'
import { actions as postActions } from '../../redux/modules/posts'
import { actions as commentActions } from '../../redux/modules/comments'
import { getPostDetail, getCommentsWithAuthors } from '../../redux/modules'
import { getLoggedUser } from '../../redux/modules/auth'

import PostView from './components/PostView'
import PostEditor from './components/PostEditor'
import CommentList from './components/CommentList'

import './style.css'

const Post = ({ post, comments, user, editDialogOpen,  fetchPostById, updatePost, getCommentList, closeEditDialog, openEditDialog, createComment }) => {
  let { id } = useParams()

  useEffect(() => {
    getCommentList(id)
    fetchPostById(id)
  }, [id, getCommentList, fetchPostById])

  return (
    <div className="post">
      {editDialogOpen ? (
        <PostEditor
          post={post}
          onSave={updatePost}
          onCancel={closeEditDialog}
        />
      ) : (
        <PostView
          post={post}
          editable={user.userId === post.author.id}
          onEditClick={openEditDialog}
        />
      )}
      <CommentList
        comments={comments}
        user={user}
        editable={Boolean(user.userId)}
        onSubmit={createComment}
      />
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  user: getLoggedUser(state),
  post: getPostDetail(state, props.match.params.id),
  comments: getCommentsWithAuthors(state, props.match.params.id),
  editDialogOpen: isEditDialogOpen(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(uiActions, dispatch),
  ...bindActionCreators(postActions, dispatch),
  ...bindActionCreators(commentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
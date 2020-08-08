import { combineReducers } from 'redux'
import { call } from '../../utils/request'
import url from '../../utils/url'
import { actions as appActions } from './app'

const initialState = {
  byPost: {},
  byId: {}
}

export const types = {
  GET_COMMENT_LIST: "COMMENTS/GET_COMMENT_LIST",
  CREATE_COMMENT: "COMMENTS/CREATE_COMMENT",
  UPDATE_COMMENT: "COMMENTS/UPDATE_COMMENT",
  DELETE_COMMENT: "COMMENTS/DELETE_COMMENT",
}

export const actions = {
  getCommentList: pid => {
    return (dispatch, getState) => {
      if (shouldFetchCommentList(pid, getState())) {
        dispatch(appActions.startRequest())
        return call(url.getCommentList(pid)).then(data => {
          dispatch(appActions.finishRequest())
          if (!data.error) {
            const { comments, commentIds, users } = convertCommentsToPlain(data)
            dispatch(getCommentListSuccess(pid, comments, commentIds, users))
          } else {
            dispatch(appActions.setError(data.error))
          }
        })
      }
    }
  },
  createComment: comment => {
    return dispatch => {
      dispatch(appActions.startRequest())
      return call(url.createComment(), "POST", comment).then(data => {
        dispatch(appActions.startRequest())
        if (!data.error) {
          dispatch(createCommentSuccess(data.post, data))
        } else {
          dispatch(appActions.setError(data.error))
        }
      })
    }
  }
}

const getCommentListSuccess = (pid, comments, commentIds, users) => ({
  type: types.GET_COMMENT_LIST,
  postId: pid,
  commentIds,
  comments,
  users,
})

const createCommentSuccess = (pid,comment) => ({
  type: types.CREATE_COMMENT,
  comment,
  postId: pid
})

const shouldFetchCommentList = (pid, state) => {
  return !state.comments.byPost[pid]
}

const convertCommentsToPlain = comments => {
  let commentIds = []
  let commentsById = {}
  let authorsById = {}
  comments.forEach(item => {
    commentsById[item.id] = { ...item, author: item.author.id }
    commentIds.push(item.id)
    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author
    }
  })
  return {
    comments: commentsById,
    commentIds,
    users: authorsById
  }
}

const byPost = (state = initialState.byPost, action) => {
  switch (action.type) {
    case types.GET_COMMENT_LIST:
      return { ...state, [action.postId]: action.commentIds }
    case types.CREATE_COMMENT:
      return {
        ...state,
        [action.postId]: [action.comment.id, ...state[action.postId]]
      };
    default:
      return state;
  }
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.GET_COMMENT_LIST:
      return { ...state, ...action.comments }
    case types.CREATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  byPost,
  byId
})

export default reducer

export const getCommentIdsByPost = (state, pid) => (
  state.comments.byPost[pid]
)

export const getComments = state => state.comments.byId

export const getCommentById = (state, id) => state.comments.byId[id]
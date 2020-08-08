import { types as postTypes } from './posts'
import { types as commentTypes } from './comments'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.GET_POST_LIST:
    case commentTypes.GET_COMMENT_LIST:
      return { ...state, ...action.users }
    case postTypes.GET_POST_BY_PID:
      return { ...state, [action.user.id]: action.user }
    default:
      return state
  }
}

export default reducer

export const getUserById = (state, id) => state.users[id]
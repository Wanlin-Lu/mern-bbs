import { types as postTypes } from './posts'
import { types as commentTypes } from './comments'

const initialState = {
  123: {
    id: 123,
    username: 'luwanlin'
  },
  223: {
    id: 223,
    username: 'wanlinlu'
  }
}

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
import { call } from '../../utils/request'
import url from '../../utils/url'
import { actions as appActions } from './app'

const initialState = {
  userId: null,
  username: null,
  email: null,
  token: null,
}

export const types = {
  LOGIN: "AUTH/LOGIN",
  LOGOUT: "AUTH/LOGOUT",
  SIGNUP: "AUTH/SIGNUP",
  SETDATA: "AUTH/SETDATA",
}

export const actions = {
  setLoginInfo: (userId, username, email, token) => {
    storeUserData(userId, username, email, token);
    return {
      type: types.LOGIN,
      userId,
      username,
      email,
      token,
    };
  },
  login: (email, password) => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      const params = JSON.stringify({ email, password });
      return call(url.login(), "POST", params).then((data) => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(
            actions.setLoginInfo(
              data._id,
              data.username,
              data.email,
              data.token
            )
          );
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  },
  setSignupInfo: (userId, username, email, token) => {
    storeUserData(userId, username, email, token);
    return {
      type: types.LOGIN,
      userId,
      username,
      email,
      token,
    };
  },
  signup: (username, email, password) => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      const params = JSON.stringify({ username, email, password });
      return call(url.signup(), "POST", params).then((data) => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(
            actions.setSignupInfo(
              data._id,
              data.username,
              data.email,
              data.token
            )
          );
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  },
  logout: () => {
    return (dispatch, getState) => {
      dispatch(appActions.startRequest());
      const token = getState().auth.token;
      const authorization = "Bearer " + token;
      return call(url.logout(), "POST", null, {
        Authorization: authorization
      }).then((data) => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          localStorage.removeItem("userData");
          dispatch(actions.logoutSuccess());
        }
      });
    };
  },
  logoutSuccess: () => ({
    type: types.LOGOUT,
  }),
  setUserData: (userId, username, email, token) => ({
    type: types.SETDATA,
    userId,
    username,
    email,
    token,
  }),
};

// localStorage store userData
const storeUserData = (userId, username, email, token) => {
  const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 55)
  localStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
      username: username,
      email: email,
      token: token,
      expiration: tokenExpirationDate.toISOString(),
    })
  )
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP:
    case types.LOGIN:
    case types.SETDATA:
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        email: action.email,
        token: action.token
      };
    case types.LOGOUT:
      return {
        ...state,
        userId: null,
        username: null,
        email: null,
        token: null,
      };
    default:
      return state
  }
}

export default reducer

export const getLoggedUser = state => state.auth;
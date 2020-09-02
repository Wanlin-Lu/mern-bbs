const BASE_URL = "http://localhost:5000/api"

export default {
  // user
  login: () => `${BASE_URL}/auth/login`,
  signup: () => `${BASE_URL}/auth/signup`,
  logout: () => `${BASE_URL}/auth/logout`,
  // post
  getPostList: () => `${BASE_URL}/posts`,
  getPostById: pid => `${BASE_URL}/posts/${pid}`,
  createPost: () => `${BASE_URL}/posts`,
  updatePost: pid => `${BASE_URL}/posts/${pid}`,
  votePost: pid => `${BASE_URL}/posts/vote/${pid}`,
  deletePost: pid => `${BASE_URL}/posts/${pid}`,
  // comment
  getCommentList: pid => `${BASE_URL}/comments/${pid}`,
  createComment: () => `${BASE_URL}/comments`,
  updateComment: pid => `${BASE_URL}/comments/${pid}`,
  deleteComment: pid => `${BASE_URL}/comments/${pid}`
}
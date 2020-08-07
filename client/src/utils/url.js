const BASE_URL = "http://localhost:5000/api"

export default {
  // user
  login: () => `${BASE_URL}/user/login`,
  signup: () => `${BASE_URL}/user/signup`,
  // post
  getPostList: () => `${BASE_URL}/posts`,
  getPostById: pid => `${BASE_URL}/posts/${pid}`,
  createPost: () => `${BASE_URL}/posts`,
  updatePost: pid => `${BASE_URL}/posts/${pid}`,
  deletePost: pid => `${BASE_URL}/posts/${pid}`,
  // comment
  getCommentList: pid => `${BASE_URL}/comments/${pid}`,
  createComment: () => `${BASE_URL}/comments`,
  updateComment: pid => `${BASE_URL}/comments/${pid}`,
  deleteComment: pid => `${BASE_URL}/comments/${pid}`
}
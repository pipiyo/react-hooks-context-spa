const BASE_URL = 'http://jsonplaceholder.typicode.com/';

const getApi = async (endpoint, params) => {
  console.log('URL', `${BASE_URL}${endpoint}?${params}`);
  const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
  return await response.json(); 
}

const getUser = async ({ username, email }) => {
  return await getApi('users', `username=${username}&email=${email}`); 
}

const getPosts = async ({ userId }) => {
  return await getApi('posts', `userId=${userId}`); 
}

const getComments = async ({ postId }) => {
  return await getApi('comments', `postId=${postId}`); 
}

export {
  getUser,
  getPosts,
  getComments
};

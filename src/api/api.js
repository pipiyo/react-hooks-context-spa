  const BASE_URL = 'http://jsonplaceholder.typicode.com/';

  const getApi = async (endpoint, params) => {
    const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
    return await response.json(); 
  }

  const getUser = async ({ username, email }) => {
    return await getApi('users', `username=${username}&email=${email}`); 
  }
  
  export {
    getUser,
  };

import React, {useState, useEffect, useContext} from 'react';
import { getPosts } from '../api/api';
import { userContext } from './UserContext';

const { Provider, Consumer } = React.createContext();

function usePost() {
  const [
    posts, 
    setPosts
  ] = useState([]);

  const [
    starredPosts, 
    setStarredPosts
  ] = useState([]);

  const [
    viewStarredPosts, 
    setViewStarredPosts
  ] = useState(false);

  const [
    currentPost, 
    setCurrentPost
  ] = useState(null);

  const [
    error, 
    setError
  ] = useState(null);

  const [
    loading, 
    setLoading
  ] = useState(false);

  const onStarredPostViewToggle = () => {
    setViewStarredPosts(viewStarredPosts => !viewStarredPosts);
  };

  const onStarredPost = (postId) => {
    setStarredPosts(starredPosts => {
      if (starredPosts.includes(postId)) {
        return starredPosts.filter( starredPost => starredPost !== postId);
      } else {
        return [
          ...starredPosts,
          postId
        ];
      }
    });
  };


  const { user } = useContext(userContext)

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const result = await getPosts({ userId: user.id });
        setPosts(result);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  return {
    posts,
    currentPost,
    setCurrentPost,
    onStarredPost,
    onStarredPostViewToggle,
    starredPosts,
    viewStarredPosts,
    error,
    loading
  };
}

const PostProvider = ({ children }) => {

  const {
    posts,
    currentPost,
    setCurrentPost,
    onStarredPost,
    onStarredPostViewToggle,
    starredPosts,
    viewStarredPosts,
    error,
    loading
  } = usePost();

  const handleSelectPost = post => {
    setCurrentPost(post);
  };

    return (
      <Provider
        value={{
          posts,
          currentPost,
          error,
          loading,
          starredPosts,
          viewStarredPosts,
          onSelectPost: handleSelectPost,
          onStarredPost,
          onStarredPostViewToggle
        }}
      >
        {children}
      </Provider>
    );
}

export { PostProvider, Consumer as PostConsumer };

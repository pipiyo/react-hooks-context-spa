import React, {useState, useEffect} from 'react';
import { PostConsumer } from '../../context/PostContext';
import { getComments } from '../../api/api';

function usePostViewer(postId) {
    const [
        comments, 
        setComments
    ] = useState([]);
  
    const [
      error, 
      setError
    ] = useState(null);
  
    const [
      loading, 
      setLoading
    ] = useState(false);
  
  
    useEffect(() => {
      const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
          const result = await getComments({ postId });
          setComments(result);
        } catch (error) {
          setError(error);
        }
        setLoading(false);
      };
      fetchData();
    }, [postId]);
  
    return {
      comments,
      error,
      loading
    };
  }

const PostViewer = ({ postId }) => {

  const {
    comments,
    loading
  } = usePostViewer(postId);

  return (
      <PostConsumer>
        {({ currentPost, starredPosts, onSelectPost, onStarredPost }) => (
          <div className="MessageViewer">
            <button onClick={() => onSelectPost(null)}>
              Back
            </button>
            <button onClick={() => onStarredPost(currentPost.id)}>
              { 
                (starredPosts.includes(currentPost.id))  
                  ? `unBookmark Post`
                  : `Bookmark Post`
              } 
            </button>
            <h2>{currentPost.title}</h2>
            <div>{currentPost.body}</div>

            <h2>Comments</h2>
            <div className="MessageList">
            {loading ? (
              <div className="no-messages">Loading...</div>
            ) : comments.length === 0 ? (
              <div className="no-messages">
                No Comments in this Post
              </div>
            ) : (
              <ul>
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                  />
                ))}
              </ul>
            )}
          </div>

          </div>
        )}
      </PostConsumer>
    )
};

const Comment = ({ comment }) => (
    <li>
      <div className="subject">{comment.name}</div>
      <div className="subject">{comment.email}</div>
      <div className="preview">{comment.body}</div>
    </li>
  );

export default PostViewer;

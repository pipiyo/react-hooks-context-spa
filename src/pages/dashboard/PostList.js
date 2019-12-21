import React from 'react';
import { UserConsumer } from '../../context/UserContext';
import { PostConsumer } from '../../context/PostContext';

const PostList = () => (
  <UserConsumer>
    {({ user }) => (
      <PostConsumer>
        {({ 
            posts, 
            loading, 
            starredPosts,
            viewStarredPosts,
            onStarredPostViewToggle,
            onSelectPost 
        }) => (
          <div className="MessageList">
            <h2>Post List</h2>
            <button onClick={() => onStarredPostViewToggle()}> 
                { 
                  (viewStarredPosts)  
                  ? `See All posts`
                  : `See Bookmarkes posts`
                } 
            </button>
            {loading ? (
              <div className="no-messages">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="no-messages">
                Your dashboard is empty, {user.username}!
              </div>
            ) : viewStarredPosts ?  (
              <ul>
                {posts
                    .filter(post => starredPosts.includes(post.id))
                    .map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onClick={() => onSelectPost(post)}
                        />
                        ))
                }
              </ul>
            ) : (
                <ul>
                  {posts.map(post => (
                    <Post
                      key={post.id}
                      post={post}
                      onClick={() => onSelectPost(post)}
                    />
                  ))}
                </ul>
              )}
          </div>
        )}
      </PostConsumer>
    )}
  </UserConsumer>
);

const Post = ({ post, onClick }) => (
  <li onClick={onClick}>
    <div className="subject">{post.title}</div>
    <div className="preview">{post.body}</div>
  </li>
);
export default PostList;

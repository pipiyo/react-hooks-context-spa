import React from 'react';
import Header from './Header';
import PostList from './PostList';
import PostViewer from './PostViewer';
import { PostConsumer } from '../../context/PostContext';

const DashboardPage = () => (
  <PostConsumer>
    {({ currentPost }) => (
      <main>
        <Header />
        {currentPost ? <PostViewer postId={currentPost.id} /> : <PostList />}
      </main>
    )}
  </PostConsumer>
);

export default DashboardPage;

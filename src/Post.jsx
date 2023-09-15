import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import UpdateForm from './UpdateForm';

const Post = ({ posts, auth, deletePost, updatePost }) => {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);
  if (!post) {
    return null;
  }

  return (
    <div>
      <h1>{post.title} ({isNaN(post.price * 1) === true ? post.price : `$${(post.price * 1).toFixed(2)}`})</h1>
      <h2>{post.description}</h2>
      <p>Location? {post.location === '[On Request]' ? 'Available Upon Request' : post.location}</p>

      {auth._id === post.author._id ?
        <div>
          <h2>Update Post</h2>
          <UpdateForm posts={posts} id={id} updatePost={updatePost} />
          <button onClick={() => deletePost(post)}>
            Delete Post
          </button>
        </div>
        : ''}
    </div>
  );
};

export default Post;

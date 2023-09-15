import { useParams, useLocation, Link } from 'react-router-dom';
import UpdateForm from './UpdateForm';

const Post = ({ posts, auth, deletePost, updatePost, expId }) => {
  const { pathname } = useLocation();
  let id;
  if (pathname === '/posts/most_expensive') {
    id = expId;
  } else {
    id = useParams().id;
  }

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
        <Link to='/'>Close</Link>
    </div>
  );
};

export default Post;

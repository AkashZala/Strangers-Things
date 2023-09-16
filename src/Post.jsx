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
    <div id='selectPost'>
      <div id='post'>
      <h1>{post.title}</h1>
        <h2>User [{post.author.username}]</h2>
        <h3>Price: {isNaN(post.price * 1) === true ? post.price : `$${(post.price * 1).toFixed(2)}`}</h3>
        <p>Details: {post.description}</p>
        <p>Location: {post.location === '[On Request]' ? 'Available Upon Request' : post.location}</p>
     </div>
      {auth._id === post.author._id ?
        <div className='update'>
          <h2>Update Post?</h2>
          <UpdateForm posts={posts} id={id} updatePost={updatePost} />
          <div id='delete'>
            <h2>Delete Post?</h2>
          <button  onClick={() => deletePost(post)}>
            Delete Post
          </button>
          </div>
        </div>
        : ''}
      <Link className='close' to='/'>&#8592;Close</Link>
      <hr />
    </div>
  );
};

export default Post;

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

const Post = ({ posts, auth, deletePost, updatePost }) => {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const post = posts.find(post => post._id === id)
    if (post) {
      setTitle(post.title);
      setDescription(post.description)
      setPrice(post.price)
      setError('')
    }
  }, [posts, id]);

  if (!post) {
    return null;
  }

  const saveUpdate = async (event) => {
    event.preventDefault();
    const post = { id, title, description, price };
    try { 
      await updatePost(post); 
    } catch(err) {
      setError(err.response.data.data.error)
    }
  }



  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {
        error ? <p>{error}</p> : ''
      }

      {auth._id === post.author._id ?
        <div>
          <h2>Update Post</h2>
          <form onSubmit={saveUpdate}>
            <label>
              <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder='Update Title'
              />
            </label>
            <label>
              <input
                value={description}
                onChange={event => setDescription(event.target.value)}
                placeholder='Update Description'
              />
            </label>
            <label>
              <input
                value={price}
                onChange={event => setPrice(event.target.value)}
                placeholder='Update Price'
              />
            </label>
            <button type='submit'>Update Post</button>
          </form>

          <button onClick={() => deletePost(post)}>
            Delete Post
          </button>
        </div>
        : ''}
    </div>
  );
};

export default Post;

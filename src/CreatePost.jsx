import { useState } from 'react'
import { Link } from 'react-router-dom';

const CreatePost = ({ createPost }) => {
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('')
  const [error, setError] = useState('');

  const submit = async (ev) => {
    ev.preventDefault();
    try {
      const post = { price, title, description, location };
      await createPost(post);
    }
    catch (ex) {
      if (ex.response) {
        setError(ex.response.data);
      }
      else {
        setError(ex.response);
      }
    }
  };
  return (
    <div className='createPost'>
      <h1>Create A New Listing:</h1>
      <form onSubmit={submit}>
        {
          error ? JSON.stringify(error, null, 2) : null
        }
        <input name='title' placeholder='title' onChange={ev => setTitle(ev.target.value)} />
        <input name='description' placeholder='description' onChange={ev => setDescription(ev.target.value)} />
        <input name='price' placeholder='price' onChange={ev => setPrice(ev.target.value)} />
        <input name='location' placeholder='location' onChange={event => setLocation(event.target.value)} />
        <button>Create</button>
      </form>
      <Link className='close' to='/'>&#8592;Cancel</Link>
      <hr />
    </div>
  );
};

export default CreatePost;

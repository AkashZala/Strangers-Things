import { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './AuthForm';
import CreatePost from './CreatePost';
import Posts from './Posts';
import Post from './Post';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

import { useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await api.fetchPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const attemptLogin = async () => {
      try {
        const _auth = await api.loginWithToken();
        setAuth(_auth);
      }
      catch (ex) {
        console.log(ex);
      }
    };
    attemptLogin();
  }, []);

  const register = async (credentials) => {
    const _auth = await api.register(credentials);
    setAuth(_auth);
  };

  const login = async (credentials) => {
    const _auth = await api.login(credentials);
    setAuth(_auth);
  };

  const logout = () => {
    api.logout();
    setAuth({});
  };

  const createPost = async (post) => {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    navigate(`/posts/${post._id}`);
  };

  const deletePost = async (post) => {
    const response = await api.deletePost(post)
    setPosts(posts.filter(_post => _post._id !== post._id))
    navigate('/');
  }

  const updatePost = async (post) => {
    const response = await api.updatePost(post)
    const updatedPost = response.data.data.post;
    setPosts(posts.map(post => post._id !== updatedPost._id ? post : updatedPost));
    navigate('/');
  }

  return (
    <>
      <h1><Link to='/'>Strangers Things ({posts.length})</Link></h1>
      {
        auth.username ? (
          <div>
            <h1>
              {`
             Welcome ${auth.username} (Active Posts: 
              ${posts.filter((post) => {
                return post.author.username === auth.username
              }).length
                })
            `
              }
              <div>
                <button onClick={logout}>Logout</button>
              </div>
            </h1>
            <Link to='/posts/create'>Create A Post</Link>
            <Link to='/about_us'>About Us</Link>
            <Link to='/contact_us'>Contact Us</Link>

            <Routes>
              <Route path='/posts/create' element={<CreatePost createPost={createPost} />} />
            </Routes>
          </div>
        ) : (
          <>
            <AuthForm submit={register} txt='Register' />
            <AuthForm submit={login} txt='Login' />
            <Link to='/about_us'>About Us</Link>
            <Link to='/contact_us'>Contact Us</Link>
          </>
        )
      }
      <Posts posts={posts} auth={auth} />
      <Routes>
        <Route path='/posts/:id' element={<Post posts={posts} auth={auth} deletePost={deletePost} updatePost={updatePost} />} />
        <Route path='/about_us' element={<AboutUs />} />
        <Route path='/contact_us' element={<ContactUs />} />
      </Routes>
    </>
  )
}

export default App

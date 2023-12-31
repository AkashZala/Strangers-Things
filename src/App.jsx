import { useState, useEffect } from 'react'
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import api from './api';
import AuthForm from './AuthForm';
import CreatePost from './CreatePost';
import Posts from './Posts';
import Post from './Post';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import MostExpensive from './MostExpensive';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    <div>
      <h1><Link to='/'>Stranger's Things ({posts.length})</Link></h1>
      {
        auth.username ? (
          <div>
            <div id='logout'>
              <button onClick={logout}>Logout</button>
            </div>
            <div id='welcome'>
              <h1>{`Welcome ${auth.username}!`}</h1>
              <h2>
                {`
             (Current Active Posts: ${posts.filter((post) => {
                  return post.author._id === auth._id
                }).length})
            `}
              </h2>
            </div>
            <nav>
              <Link to='/posts/most_expensive' className={pathname === '/posts/most_expensive' ? 'selected' : ''}>Most Expensive Post</Link>
              <Link to='/posts/create' className={pathname === '/posts/create' ? 'selected' : ''}>Create A Post</Link>
              <Link to='/about_us' className={pathname === '/about_us' ? 'selected' : ''}>About Us</Link>
              <Link to='/contact_us' className={pathname === '/contact_us' ? 'selected' : ''}>Contact Us</Link>
            </nav>

            <Routes>
              <Route path='/posts/create' element={<CreatePost createPost={createPost} />} />
            </Routes>
          </div>
        ) : (
          <>
            <AuthForm submit={register} txt='Register' label='New? Register Now For Full Access!' />
            <AuthForm submit={login} txt='Login' label='Already Registered? Login Now!' />
            <nav>
              <Link to='/posts/most_expensive'>Most Expensive Post</Link>
              <Link to='/about_us'>About Us</Link>
              <Link to='/contact_us'>Contact Us</Link>
            </nav>
          </>
        )
      }

      <Routes {...window.scroll(0, 0)}>
        <Route path='/posts/:id' element={<Post posts={posts} auth={auth} deletePost={deletePost} updatePost={updatePost} />} />
        <Route path='/about_us' element={<AboutUs />} />
        <Route path='/contact_us' element={<ContactUs />} />
        <Route path='/posts/most_expensive' element={<MostExpensive posts={posts} auth={auth} deletePost={deletePost} updatePost={updatePost} />} />
      </Routes>
      <Posts posts={posts} auth={auth} />
    </div>
  )
}

export default App

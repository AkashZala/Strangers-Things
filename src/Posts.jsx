import { Link } from 'react-router-dom';

const Posts = ({ posts, auth }) => {
  return (
    <div className='allPosts'>
      <h1>All Posts</h1>
      <h2>Select A Post For Details</h2>
      <div className='postsContainer'>
        {
          posts.map(post => {
            return (
              <div key={post._id} className={post.author._id === auth._id ? 'mine posts' : 'posts'}>
                <Link to={`/posts/${post._id}`}>
                  <h3>{post.title}</h3>
                  <p>by: {post.author.username}</p>
                  <p>Price: {isNaN(post.price * 1) === true ? post.price : `$${(post.price * 1).toFixed(2)}`}</p>
                  <p>{post.location === '[On Request]' ? 'Location Available Upon Request' : `Location: ${post.location}`}</p>
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Posts;


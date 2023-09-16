import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className='about'>
      <h1>About Us</h1>
      <h2>Fullstack Academy Cohort 2307</h2>
      <p>
        We are Fullstack Academy cohort 2307. We are a group of web development 
        bootcamp students. While being tasked with implementing a functioning app to 
        CRUD (Create, Read, Update, Delete) entries in an API,
        we decided to make some money and offload things we dont need. Here we are!
        There are posts listing various things and offers. Make sure to register an
        account so you can post your own listings and have full access to all the 
        information in the current listings.
      </p>
      <Link className='close' to='/'>&#8592;Close</Link>
      <hr />
    </div>
  );
};

export default AboutUs;

import { Link } from "react-router-dom";

const ContactUs = () => {
    return (
        <div className='contact'>
            <h1>Contact Us</h1>
            <Link className='close' to='/'>&#8592;Close</Link>
            <hr />
        </div>
    );
}

export default ContactUs;
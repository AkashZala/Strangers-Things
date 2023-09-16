import { Link } from "react-router-dom";

const ContactUs = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div className='contact'>
            <h1>Questions? Contact Us</h1>
            <p>Send us an email: placeHolder@someEmail.com</p>
            <p>Give us a call: (XXX) XXX-XXXX</p>
            <h2>or Send us message with this form!</h2>
            <div id='contactFormContainer'>
                <form id='contactForm' onSubmit={handleSubmit}>
                    <label>Enter Name:</label>
                    <input type='text' id='uname' name='uname' placeholder="Name" />
                    <label>Enter Email Address:</label>
                    <input type='email' id='email' name='email' placeholder="Email" />
                    <label>Enter Message:</label>
                    <textarea type='text' id='message' name='message' placeholder='Message' />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <Link className='close' to='/'>&#8592;Close</Link>
            <hr />
        </div>
    );
}

export default ContactUs;
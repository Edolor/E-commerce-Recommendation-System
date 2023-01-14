import "./_contact.scss";
import { useState } from "react";


function ContactForm(props) {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    
    const [status, setStatus] = useState("empty");

    function handleSubmit(e) {
        e.preventSubmit();
    }
    
    function handleNameChange(e) {
        setName(e.target.value);
    }
    
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePhoneChange(e) {
        setPhone(e.target.value);
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    return (
        <form action="#" onSubmit={handleSubmit} method="post" className="contact__form">
            
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={handleNameChange}
                        placeholder="Name" />
                { nameError &&
                    <small className="err body-copy--small">{nameError}</small>
                }
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={handleEmailChange}
                        placeholder="Email" />
                { emailError &&
                    <small className="err body-copy--small">{emailError}</small>
                }
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" 
                        id="phone" 
                        name="phone" 
                        value={phone} 
                        onChange={handlePhoneChange}
                        placeholder="Phone Number" />
                { phoneError &&
                    <small className="err body-copy--small">{phoneError}</small>
                }
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" 
                            name="message" 
                            value={message} 
                            onChange={handleMessageChange} 
                            placeholder="Message" />
                { messageError &&
                    <small className="err body-copy--small">{messageError}</small>
                }
            </div>

            <button type="submit" disabled={status === "empty"}>Send Message</button>
        </form>
    );
}

function Contact(props) {

    return (
        <div className="width-wrapper pd-all--2-4">
            <h1 className="heading-2 margin-top-2 margin-bottom-4">Contact us</h1>

            <ContactForm />
        </div>
    );
}

export default Contact;
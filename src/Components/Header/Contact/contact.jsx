import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './contact.css';
import { Link } from 'react-router-dom';
import { faAt, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

function Contact() {
    return (
        <>
            <div className="contactmain">
                <div className="contactmain1">
                    <h1>Connect<h5>with</h5>Smart Learn AI</h1>
                </div>
                <div className="contactmain2">
                    <div className="contactleftside">
                        <h3>Get in Touch</h3>
                        <input type="text" placeholder='Full Name' />
                        <input type="email" placeholder='Email Address' />
                        <input type="text" placeholder='Subject' />
                        <textarea name="" id="" placeholder='Your Message'></textarea>
                        <button>Send Message</button>
                    </div>
                    <div className="contactrigthside">
                        <h3>Contact Information</h3>
                        <div className="rigthsidephone">
                            <label> <FontAwesomeIcon icon={faPhone} /> </label>
                            <p>+94 765858504</p>
                        </div>
                        <div className="rigthsideemail">
                            <label> <FontAwesomeIcon icon={faAt} /> </label>
                            <p>smartlearningai@gmail.com</p>
                        </div>
                        <div className="rigthsidelocation">
                            <label> <FontAwesomeIcon icon={faLocationDot} /> </label>
                            <p>Kurunegala, Sri Lanka</p>
                        </div>
                    </div>
                </div>
                <div className="contactbtn">
                    <Link to={'/'}><button>Back</button></Link>
                </div>
            </div>
        </>
    )
}

export default Contact

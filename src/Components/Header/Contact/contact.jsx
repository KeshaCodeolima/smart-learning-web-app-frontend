import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './contact.css';
import { Link } from 'react-router-dom';
import { faAt, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const {t}=useTranslation();

    const validation = () => {
        const newErrors = {};

        if (!name) {
            newErrors.name = "Name is Required.";
        }
        if (!email) {
            newErrors.email = "Email is required.";
        }
        if (!subject) {
            newErrors.subject = "Subject is required."
        }
        if (!message) {
            newErrors.message = "Message is Rquired."
        }
        return newErrors;
    };

    const Notify = () => {
        toast.success(t("emailSuccess"), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }

    const NotifyInfo = () => {
        toast.info(t("emailFail"), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    }

    const handleEmialSend = async (e) => {
        e.preventDefault();
        const ValidationErrors = validation();
        if (Object.keys(ValidationErrors).length > 0) {
            setErrors(ValidationErrors);
        } else {
            try {
                const result = await axios.post('http://localhost:5000/api/users/email-send', { name, email, subject, message });
                if (result.data === "Email send successful") {
                    Notify();
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                } else {
                    NotifyInfo();
                }
            } catch (error) {
                console.log(error);
                toast.error(t("serverError"), { position: "top-center" });
            }
        }
    }
    return (
        <>
            <div className="contactmain">
                <div className="contactmain1">
                    <h1>{t("connect")}<h5>{t("with")}</h5>Smart Learn AI</h1>
                </div>
                <div className="contactmain2">
                    <div className="contactleftside">
                        <form onSubmit={handleEmialSend}>
                            <h3>{t("getInTouch")}</h3>

                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t("fullName")}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p className="errors">{t("nameRequired")}</p>}
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder={t("emailAddress")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="errors">{t("emailRequired")}</p>}
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t("subject")}
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                {errors.subject && <p className="errors">{t("subjectRequired")}</p>}
                            </div>

                            <div className="form-group">
                                <textarea
                                    placeholder={t("message")}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                {errors.message && <p className="errors">{t("messageRequired")}</p>}
                            </div>

                            <button type="submit">{t("sendMessage")}</button>
                        </form>
                    </div>
                    <div className="contactrigthside">
                        <h3>{t("contactInfo")}</h3>
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
                    <Link to={'/'}><button>{t("back")}</button></Link>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Contact

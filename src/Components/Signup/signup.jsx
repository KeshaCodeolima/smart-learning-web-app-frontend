import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reenterpassword, setReenterpassword] = useState('');
    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const validation = () => {

        const newErrors = {};
        if (!name) {
            newErrors.name = t("nameRequired")
        }
        if (!email) {
            newErrors.email = t("emailRequired");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = t("emailInvalid");
        }
        if (!username) {
            newErrors.username = t("usernameRequired");
        }
        if (!password) {
            newErrors.password = t("passwordRequired");
        } else if (password.length < 6) {
            newErrors.password = t("passwordLength");
        }
        if (!reenterpassword) {
            newErrors.reenterpassword = t("reenterRequired");
        } else if (password !== reenterpassword) {
            newErrors.reenterpassword = t("passwordMismatch");
        }
        return newErrors;
    };

    const Notify = () => {
        toast.success(t("registerSuccess"), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => navigate('/')
        });
    }
    const NotifyInfo = () => {
        toast.warn(t("registerFail"), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

    const register = (e) => {
        e.preventDefault();
        const ValidationErrors = validation();
        if (Object.keys(ValidationErrors).length > 0) {
            setErrors(ValidationErrors);
        } else {
            axios.post('http://localhost:5000/api/users/register', { name, email, username, password })
                .then(result => {
                    if (result.data === 'Successful') {
                        Notify();
                    } else {
                        NotifyInfo();
                    }
                }).catch(error => console.log(error));
        }
    };
    return (
        <>
            <div className="signupmain">
                <h2>{t("register")}</h2>
                <form onSubmit={register}>
                    <div className="signupinputs">

                        <label>{t("name")}:</label>
                        <input type="text" name="" id="" onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className='errors'>{errors.name}</p>}

                        <label>{t("email")}:</label>
                        <input type="text" name="" id="" onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className='errors'>{errors.email}</p>}

                        <label>{t("username")}:</label>
                        <input type="text" name="" id="" onChange={(e) => setUsername(e.target.value)} />
                        {errors.username && <p className='errors'>{errors.username}</p>}

                        <label>{t("password")}:</label>
                        <div className='password-field'>
                            <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                            <span className='eye-icon' onClick={(e) => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors.password && <p className='errors'>{errors.password}</p>}

                        <label>{t("reenterPassword")}:</label>
                        <div className='password-field'>
                            <input type={showPassword1 ? "text" : "password"} onChange={(e) => setReenterpassword(e.target.value)} />
                            <span className='eye-icon' onClick={(e) => setShowPassword1(!showPassword1)}>
                                {showPassword1 ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors.reenterpassword && <p className='errors'>{errors.reenterpassword}</p>}

                    </div>
                    <div className="signupbtn">
                        <button type='submit'>{t("register")}</button>
                    </div>
                    <div className="signuplink">
                        <span> {t("alreadyHaveAccount")} <Link to={'/'}>{t("login")}</Link>. </span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Signup

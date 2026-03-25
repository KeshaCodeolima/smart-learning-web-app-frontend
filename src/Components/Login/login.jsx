import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const validation = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = t("usernameRequired");
        }
        if (!password) {
            newErrors.password = t("passwordRequired");
        } else if (password.length < 6) {
            newErrors.password = t("passwordLength")
        }
        return newErrors;
    };

    const Notify = () => {
        toast.success(t("loginSuccess"), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => navigate('/dashboard')
        });
    }
    const NotifyInfo = () => {
        toast.info(t("loginError"), {
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

    const login = (e) => {
        e.preventDefault();
        const ValidationErrors = validation();
        if (Object.keys(ValidationErrors).length > 0) {
            setErrors(ValidationErrors);
        } else {
            axios.post('http://localhost:5000/api/users/login', { username, password })
                .then((result) => {
                    if (result.data.message === 'Successful Login') {
                        Notify();
                        localStorage.setItem("keepLoggedIn", JSON.stringify(true));
                        localStorage.setItem("currentuser", JSON.stringify(result.data.user));
                    } else {
                        NotifyInfo();
                    }
                }).catch((error) => { console.log(error) })
        }
    }
    return (
        <>
            <div className="loginmain">
                <h2>{t("login")}</h2>
                <form onSubmit={login}>
                    <div className="logininput">
                        <label>{t("user_name")}:  </label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} />
                        {errors.username && <p className='errors'>{errors.username}</p>}

                        <label>{t("password")}: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className='errors'>{errors.password}</p>}
                    </div>
                    <div className="loginfoget">
                        <Link to={'/adminlogin'}>
                            <label>{t("adminLogin")}</label>
                        </Link>
                        <Link to={'/forgot'} >
                            <label>{t("forgotPassword")}</label>
                        </Link>
                    </div>
                    <div className="loginbtn">
                        <button>{t("login")}</button>
                    </div>
                    <div className="loginlinks">
                        <label>{t("noAccount")} <Link to={'/signup'}>{t("signup")}</Link>.</label>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login

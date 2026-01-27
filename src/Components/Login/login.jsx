import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const validation = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = "User Name is Required.";
        }
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password Must be 6 Characters or More."
        }
        return newErrors;
    };

    const login = (e) => {
        e.preventDefault();
        const ValidationErrors = validation();
        if (Object.keys(ValidationErrors).length > 0) {
            setErrors(ValidationErrors);
        } else {
            axios.post('http://localhost:5000/api/users/login', { username, password })
                .then((result) => {
                    if (result.data.message === 'Successful Login') {
                        alert("Login Successfully!")
                        localStorage.setItem("keepLoggedIn", JSON.stringify(true));
                        localStorage.setItem("currentuser", JSON.stringify(result.data.user));
                        navigate("/dashboard")
                    } else {
                        alert(result.data);
                    }
                }).catch((error) => { console.log(error) })
        }
    }
    return (
        <>
            <div className="loginmain">
                <h2>Login</h2>
                <form onSubmit={login}>
                    <div className="logininput">
                        <label>User Name: </label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} />
                        {errors.username && <p className='errors'>{errors.username}</p>}

                        <label>Password: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className='errors'>{errors.password}</p>}
                    </div>
                    <div className="loginfoget">
                        <label>Forget Password</label>
                    </div>
                    <div className="loginbtn">
                        <button>Login</button>
                    </div>
                    <div className="loginlinks">
                        <label>Already not have a Account <Link to={'/signup'}>Signup</Link>.</label>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login

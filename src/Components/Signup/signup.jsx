import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reenterpassword, setReenterpassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const validation = () => {

        const newErrors = {};
        if (!name) {
            newErrors.name = "Name is Required."
        }
        if (!email) {
            newErrors.email = "Email is Required."
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is not Valid."
        }
        if (!username) {
            newErrors.username = "User Name is Required."
        }
        if (!password) {
            newErrors.password = "Password is Required."
        } else if (password.length < 6) {
            newErrors.password = "Password Must be 6 Characters or More."
        }
        if (!reenterpassword) {
            newErrors.reenterpassword = "Reenter Password is Required."
        } else if (password !== reenterpassword) {
            newErrors.reenterpassword = "Reenter Password is not Match to Previous Password."
        }
        return newErrors;
    };

    const register = (e) => {
        e.preventDefault();
        const ValidationErrors = validation();
        if (Object.keys(ValidationErrors).length > 0) {
            setErrors(ValidationErrors);
        } else {
            axios.post('http://localhost:5000/api/users/register', { name, email, username, password })
                .then(result => {
                    if(result.data === 'Successful'){
                        alert('Register Successfully!');
                        navigate('/');
                    }else{
                        alert(result.data);
                    }
                }).catch(error => console.log(error));
        }
    };
    return (
        <>
            <div className="signupmain">
                <h2>Register</h2>
                <form onSubmit={register}>
                    <div className="signupinputs">

                        <label>Name:</label>
                        <input type="text" name="" id="" onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className='errors'>{errors.name}</p>}

                        <label>Email:</label>
                        <input type="text" name="" id="" onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className='errors'>{errors.email}</p>}

                        <label>User Name:</label>
                        <input type="text" name="" id="" onChange={(e) => setUsername(e.target.value)} />
                        {errors.username && <p className='errors'>{errors.username}</p>}

                        <label>Password:</label>
                        <input type="password" name="" id="" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className='errors'>{errors.password}</p>}

                        <label>Reenter Password:</label>
                        <input type="password" name="" id="" onChange={(e) => setReenterpassword(e.target.value)} />
                        {errors.reenterpassword && <p className='errors'>{errors.reenterpassword}</p>}

                    </div>
                    <div className="signupbtn">
                        <button type='submit'>Register</button>
                    </div>
                    <div className="signuplink">
                        <span>Already have a Account <Link to={'/'}>Login</Link>. </span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup

import { Link } from 'react-router-dom';
import './login.css';

function login() {
    return (
        <>
            <div className="loginmain">
                <h2>Login</h2>
                <div className="logininput">
                    <label>User Name: </label>
                    <input type="email" />
                    <label>Password: </label>
                    <input type="password" />
                </div>
                <div className="loginfoget">
                    <label>Forget Password</label>
                </div>
                <div className="loginbtn">
                    <button>Login</button>
                </div>
                <div className="loginlinks">
                    <label>Already not have a <Link to={'/signup'}>Account</Link>.</label>
                </div>
            </div>
        </>
    )
}

export default login

import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Forgotpassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const Notify = () => {
        toast.success("Check YOur Email Your Token Expire in 5 Minutes!", {
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

    const NotifyError = () => {
        toast.warn("Your Emial not Found Try Again!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/sendemail', { email })
            if (response.data === "email send successfully") {
                Notify();
            } else {
                NotifyError();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="loginmain">
                <h2>Renew Password</h2>
                <form onSubmit={handleEmail}>
                    <div className="logininput">
                        <label>Enter Email </label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="loginbtn">
                        <button type='submit'>Send Reset Link</button>
                    </div>
                    <div className="loginlinks">
                        <label>You Found the Password <Link to={'/'}>Login</Link>.</label>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Forgotpassword

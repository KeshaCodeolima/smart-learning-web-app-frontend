import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const validation = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is Required.";
        }
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password Must be 6 Characters or More."
        }
        return newErrors;
    };

    const Notify = () => {
        toast.success("Login Successful!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => navigate('/adminpage')
        });
    }
    const NotifyError = () => {
        toast.warn("Your Details are Invaild Try Again!", {
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const ValidationErrors = validation();
            if (Object.keys(ValidationErrors).length > 0) {
                setErrors(ValidationErrors);
            } else {
                const res = await axios.post("http://localhost:5000/api/users/admin-login", { email, password });

                if (res.data.message === "Admin login successful") {
                    Notify();
                    localStorage.setItem("adminuser", JSON.stringify(res.data.admin));
                } else {
                    NotifyError();
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Server Error!", { position: "top-center" });
        }
    }

    return (
        <>
            <div className="loginmain">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="logininput">
                        <label>Email: </label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className='errors'>{errors.email}</p>}

                        <label>Password: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className='errors'>{errors.password}</p>}
                    </div>

                    <div className="loginbtn">
                        <button>Admin Login</button>
                    </div>
                    <div className="loginlinks">
                        <label>Back to User <Link to={'/'}>Login</Link>.</label>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin;
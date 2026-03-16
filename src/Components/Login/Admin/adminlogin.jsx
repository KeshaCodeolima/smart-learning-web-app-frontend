import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            const res = await axios.post("http://localhost:5000/api/users/admin-login", { email, password });

            if (res.data.message === "Admin login successful") {
                Notify();
            } else {
                NotifyError();
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

                        <label>Password: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
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
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Resetpassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");

    const updatePassword = async (e) => {
        e.preventDefault();
        await axios.post(
            `http://localhost:5000/api/users/resetpassword/${token}`,
            { password }
        )
        alert("Password Updated");
        window.close();
    }
    return (
        <div className="loginmain">
            <h2>Reset Password</h2>
            <form onSubmit={updatePassword}>
                <div className="logininput">
                    <label>New Password </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="loginbtn">
                    <button type='submit'>Update Password</button>
                </div>
            </form>
        </div>
    )
}

export default Resetpassword;
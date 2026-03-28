import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Resetpassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

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
            <h2>{t("resetPassword")}</h2>
            <form onSubmit={updatePassword}>
                <div className="logininput">
                    <label>{t("newPassword")}</label>
                    <div className='password-field'>
                        <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                        <span className='eye-icon' onClick={(e) => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                </div>
                <div className="loginbtn">
                    <button type='submit'>{t("updatePassword")}</button>
                </div>
            </form>
        </div>
    )
}

export default Resetpassword;
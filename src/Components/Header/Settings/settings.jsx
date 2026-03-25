import './settings.css';
import LogoutIcon from '../../../Images/logouticon.png';
import { useTranslation } from 'react-i18next';

function Settings() {
    const user = JSON.parse(localStorage.getItem("currentuser")) || {};
    const { t } = useTranslation();
    const logouthandle = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <>
            <div className="settingmain">
                <h2>{t("settings")}</h2>
                <div className="settingmain2">
                    <div className="settingname">
                        <label>{t("fullName")}</label>
                        <span>{user.name || t("pleaseLogin")}</span>
                    </div>
                    <div className="settinguser">
                        <label>{t("username")}</label>
                        <span>{user.username || t("pleaseLogin")}</span>
                    </div>
                    <div className="settingemail">
                        <label>{t("email")}</label>
                        <span>{user.email || t("pleaseLogin")}</span>
                    </div>
                </div>
                <button className='settingbtn' onClick={logouthandle}>{t("logout")}
                    <img src={LogoutIcon} alt="LogoutIcon" className='logouticonbtn' />
                </button>
            </div>
        </>
    )
}

export default Settings

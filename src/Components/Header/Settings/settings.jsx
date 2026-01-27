import './settings.css';
import LogoutIcon from '../../../Images/logouticon.png';

function Settings() {
    const user = JSON.parse(localStorage.getItem("currentuser")) || {};
    const logouthandle = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <>
            <div className="settingmain">
                <h2>Setting page</h2>
                <div className="settingmain2">
                    <div className="settingname">
                        <label>Full Name</label>
                        <span>{user.name || "Please Login"}</span>
                    </div>
                    <div className="settinguser">
                        <label>UserName</label>
                        <span>{user.username || 'Please Login'}</span>
                    </div>
                    <div className="settingemail">
                        <label>Email</label>
                        <span>{user.email || "Please Login"}</span>
                    </div>
                </div>
                <button className='settingbtn' onClick={logouthandle}>Logout
                    <img src={LogoutIcon} alt="LogoutIcon" className='logouticonbtn' />
                </button>
            </div>
        </>
    )
}

export default Settings

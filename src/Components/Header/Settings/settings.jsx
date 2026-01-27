import './settings.css';
import LogoutIcon from '../../../Images/logouticon.png';

function settings() {
    return (
        <>
            <div className="settingmain">
                <h2>Setting page</h2>
                <div className="settingmain2">
                    <div className="settingname">
                        <label>Full Name</label>
                        <span>show name</span>
                    </div>
                    <div className="settinguser">
                        <label>UserName</label>
                        <span>show username</span>
                    </div>
                    <div className="settingemail">
                        <label>Email</label>
                        <span>show email</span>
                    </div>
                </div>
                <button className='settingbtn'>Logout
                    <img src={LogoutIcon} alt="LogoutIcon" className='logouticonbtn' />
                </button>
            </div>
        </>
    )
}

export default settings

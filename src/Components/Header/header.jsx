import './header.css';
import Setting from '../../Images/settingicon.png';
import { useState } from 'react';
import Settings from './Settings/settings';

function Header() {
  const [isopen, setIsopen] = useState(false);
  return (
    <>
      <div className="headermain">
        <h2>Smart Learning Web Application </h2>
        <div className="headerlabel">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
          <ul className='settingicon' onClick={() => setIsopen(true)}>
            <img src={Setting} alt="Setting" />
          </ul>
        </div>
      </div>
      <div className={`settings-drawer ${isopen ? 'open' : ''}`}>
        <div className="drawer-content">
          <button className="close-btn" onClick={() => setIsopen(false)}>×</button>
          <Settings />
        </div>
      </div>
    </>
  )
}

export default Header

import './header.css';
import Setting from '../../Images/settingicon.png';
import { useState } from 'react';
import Settings from './Settings/settings';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [isopen, setIsopen] = useState(false);
  const navigate = useNavigate();

  const NotifyWarning = () => {
    toast.warning("Please Login To Page", {
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

  const handledash = (e) => {
    e.preventDefault();
    const isLoggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"));

    if (isLoggedIn) {
      navigate('/dashboard')
    } else {
      NotifyWarning();
    }
  }
  return (
    <>
      <div className="headermain">
        <h2>Smart Learning Web Application </h2>
        <div className="headerlabel">
          <ul>
            <li onClick={handledash}>Home</li>
            <Link to={'/about'}><li>About</li></Link>
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
      <ToastContainer />
    </>
  )
}

export default Header

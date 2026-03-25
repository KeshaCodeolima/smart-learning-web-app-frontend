import './header.css';
import Setting from '../../Images/settingicon.png';
import { useState } from 'react';
import Settings from './Settings/settings';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function Header() {
  const [isopen, setIsopen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  }

  const NotifyWarning = () => {
    toast.warning(t('loginWarning'), {
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
            <li onClick={handledash}>{t('home')}</li>
            <Link to={'/about'}><li>{t('about')}</li></Link>
            <Link to={'/contact'}><li>{t('contact')}</li></Link>
          </ul>
          <select
            className="lang-select"
            value={i18n.language}
            onChange={(e) => changeLang(e.target.value)}>
            <option value="en">English</option>
            <option value="si">සිංහල</option>
            <option value="ta">தமிழ்</option>
          </select>
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

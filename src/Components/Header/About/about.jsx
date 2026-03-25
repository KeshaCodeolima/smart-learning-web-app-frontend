import './about.css';
import MyImage from '../../../Images/DSC_0194.jpg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function About() {
    const { t } = useTranslation();
    return (
        <>
            <div className="aboutmain">
                <div className="aboutmain1">
                    <h1>{t("aboutTitle")}</h1>
                </div>
                <div className="aboutmain2">
                    <div className="aboutleftside">
                        <h3>{t("missionVision")}</h3>
                        <span> <p style={{ fontWeight: 'bold' }}>{t("mission")}</p>{t("missionText")}</span>
                        <span> <p style={{ fontWeight: 'bold' }}>{t("vision")}</p>{t("visionText")}</span>
                        <h3>{t("whatWeOffer")}</h3>
                        <span>{t("offer1")}</span>
                        <span>{t("offer2")}</span>
                        <span>{t("offer3")}</span>
                        <span>{t("offer4")}</span>
                        <span>{t("offer5")}</span>
                        <span>{t("offer6")}</span>
                    </div>
                    <div className="aboutrigthside">
                        <h3>{t("meetFounder")}</h3>
                        <img src={MyImage} alt="MyPicture" className='myimage' />
                        <span>Mr.Keshan Kulasekara</span>
                    </div>
                </div>
                <div className="aboutbtn">
                    <Link to={'/'}><button>{t("back")}</button></Link>
                </div>
            </div>
        </>
    )
}

export default About

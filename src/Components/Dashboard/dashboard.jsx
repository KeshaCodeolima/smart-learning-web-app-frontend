import './dashboard.css';
import Camera from '../../Images/Camera.png';
import Quiz from '../../Images/Quiz.png';
import ShortNote from '../../Images/ShortNote.png';
import Progres from '../../Images/Progres.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Dashboard() {
    const {t}=useTranslation();
    return (
        <>
            <div className="dashmain">
                <h2>{t("dashboard")}</h2>
                <div className="dashmain2">
                    <div className="dashsection">
                        <Link to={'/video'}>
                            <div className="dashvideo">
                                <img src={Camera} alt="Camera" className='image' />
                                <p>{t("videoTitle")}</p>
                                <span>{t("videoDesc")}</span>
                            </div>
                        </Link>
                        <Link to={'/quiz'}>
                            <div className="dashquiz">
                                <img src={Quiz} alt="Quiz" className='image' />
                                <p>{t("quizTitle")}</p>
                                <span>{t("quizDesc")}</span>
                            </div>
                        </Link>
                        <Link to={'/note'}>
                            <div className="dashshort">
                                <img src={ShortNote} alt="ShortNote" className='image' />
                                <p>{t("noteTitle")}</p>
                                <span>{t("noteDesc")}</span>
                            </div>
                        </Link>
                        <Link to={'/progress'}>
                            <div className="dashprogres">
                                <img src={Progres} alt="Progress" className='image' />
                                <p>{t("progressTitle")}</p>
                                <span>{t("progressDesc")}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

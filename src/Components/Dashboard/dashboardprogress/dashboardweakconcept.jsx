import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

function Dashboardweakconcept() {
    const location = useLocation();
    const weak = location.state?.weaktopics || [];
    const { t } = useTranslation();
    return (
        <div className="totaltopic-page" style={{ width: '50%', marginLeft: '380px' }}>
            <h2 className="page-title">{t("weakTopics")}</h2>
            <div className="topic-container">
                {weak.length === 0 && <p>{t("noWeakTopics")}</p>}
                {weak.map((w, i) => (
                    <div className="topic-card" style={{ width: '80%', }} key={i}>
                        <h3>{w.topic}</h3>
                        <p>{t("score")}: {w.score}%</p>
                    </div>
                ))}
            </div>
            <Link to={'/progress'}>
                <button>{t("back")}</button>
            </Link>
        </div>
    )
}

export default Dashboardweakconcept

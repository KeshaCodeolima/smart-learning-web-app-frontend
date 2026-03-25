import { Link, useLocation } from "react-router-dom";
import './dashboardprogress.css';
import { useTranslation } from "react-i18next";

function Dashboardtotaltopic() {
    const location = useLocation();
    const results = location.state?.results || [];
    const { t } = useTranslation();

    return (
        <div className="totaltopic-page">
            <h2 className="page-title">{t("allQuizResults")}</h2>
            <div className="topic-container">
                {results.map((r, i) => (
                    <div className="topic-card" key={i}>
                        <h3>{r.topic}</h3>
                        <p>{t("score")}: <span>{r.score}%</span></p>
                    </div>
                ))}
            </div>
            <Link to={'/progress'}>
                <button>{t("back")}</button>
            </Link>
        </div>
    )
}

export default Dashboardtotaltopic

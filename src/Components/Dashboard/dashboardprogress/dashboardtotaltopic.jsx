import { Link, useLocation } from "react-router-dom";
import './dashboardprogress.css';

function Dashboardtotaltopic() {
    const location = useLocation();
    const results = location.state?.results || [];

    return (
        <div className="totaltopic-page">
            <h2 className="page-title">All Quiz Results</h2>
            <div className="topic-container">
                {results.map((r, i) => (
                    <div className="topic-card" key={i}>
                        <h3>{r.topic}</h3>
                        <p>Score: <span>{r.score}%</span></p>
                    </div>
                ))}
            </div>
            <Link to={'/progress'}>
                <button>Back</button>
            </Link>
        </div>
    )
}

export default Dashboardtotaltopic

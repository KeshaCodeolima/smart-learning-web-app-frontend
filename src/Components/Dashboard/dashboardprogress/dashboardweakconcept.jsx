import { Link, useLocation } from 'react-router-dom';

function Dashboardweakconcept() {
    const location = useLocation();
    const weak = location.state?.weaktopics || [];

    return (
        <div className="totaltopic-page" style={{ width: '50%', marginLeft: '380px' }}>
            <h2 className="page-title">Weak Topics</h2>
            <div className="topic-container">
                {weak.length === 0 && <p>No weak topics 🎉</p>}
                {weak.map((w, i) => (
                    <div className="topic-card" style={{ width: '40%', }} key={i}>
                        <h3>{w.topic}</h3>
                        <p>Score: {w.score}%</p>
                    </div>
                ))}
            </div>
            <Link to={'/progress'}>
                <button>Back</button>
            </Link>
        </div>
    )
}

export default Dashboardweakconcept

import { useLocation, useNavigate } from 'react-router-dom';

function ConfusedTimes() {
    const location = useLocation();
    const navigate = useNavigate();

    const moments = location.state?.confusedMoments || [];
    const videoSrc = location.state?.videoSrc;
    const filename = location.state?.filename;

    return (
        <div className="confused-main">
            <div className="confused-card">
                <h2>Confused Moments</h2>

                {moments.length === 0 ? (
                    <p className="no-data">No data available</p>
                ) : (
                    <table className="confused-table">
                        <thead>
                            <tr>
                                <th>Count</th>
                                <th>Time (mm:ss)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moments.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.time}</td>
                                    <td>
                                        <button
                                            className="jump-btn"
                                            onClick={() =>
                                                navigate('/video', {
                                                    state: {
                                                        seekTo: item.raw,
                                                        videoSrc: videoSrc,
                                                        filename: filename,
                                                    }
                                                })
                                            }
                                        >
                                            Replay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button
                    className="back-btn"
                    onClick={() => navigate('/video', {
                        state: {
                            videoSrc: videoSrc,
                            filename: filename,
                        }
                    })}
                >
                    Back to Video
                </button>
            </div>
        </div>
    );
}

export default ConfusedTimes;
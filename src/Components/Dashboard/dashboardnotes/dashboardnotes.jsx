import { Link } from 'react-router-dom';
import './dashboardnotes.css';
import { useState } from 'react';
import axios from 'axios';

function Dashboardnotes() {

    const [noteContent, setNoteContent] = useState('');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreatNote = async () => {
        if (!noteContent)
            return alert("Please Add Some Note First!")

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/note', {
                text: noteContent
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error Summarizing:", error);
            alert("Something went wrong with Note Summarizing")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <div className="notemain">
                <h2>Summaries Your Notes</h2>
                <div className="notemain2">
                    <span>Note Content</span>
                    <textarea name="question" placeholder='Add the Note Here to Summaraz' value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}></textarea>
                    <div className="notemainbtn">
                        <button onClick={handleCreatNote} disabled={isLoading}>
                            {isLoading ? "Summarizing..." : "Create Short Note"}
                        </button>
                        <Link to={'/dashboard'}>
                            <button className='notebtn'>Back to Dashboard</button>
                        </Link>
                    </div>
                </div>
                {summary && (
                    <div className="summary-result" style={{ marginTop: '20px', textAlign: 'left' }} >
                        <h3>Short Note Result:</h3>
                        <div className="summary-box" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }} >
                            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }} >{summary}</pre>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboardnotes

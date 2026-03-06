import { Link } from 'react-router-dom';
import './dashboardnotes.css';
import { useState } from 'react';
import axios from 'axios';

function Dashboardnotes() {

    const [noteContent, setNoteContent] = useState('');
    const [language, setLanguage] = useState('None');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreatNote = async () => {
        if (!noteContent)
            return alert("Please Add Some Note First!")

        if(language ==='None')
            return alert("Please Select the Language You Want!")

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/note', {
                text: noteContent,
                language: language
            });

            const summarytext = response.data.summary;
            const bulletPoints = summarytext
                .split(/\. |\n\n|•/)
                .map(point => point.trim())
                .filter(point => point.length > 0);

            setSummary(bulletPoints);

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
                    <div className='language-container'>
                        <label htmlFor="language">Select Language:</label>
                        <select
                            className='language-selector'
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="None" selected>None</option>
                            <option value="English">English</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Sinhala">Sinhala</option>
                        </select>
                    </div>

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

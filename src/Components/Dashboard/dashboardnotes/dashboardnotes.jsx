import { Link } from 'react-router-dom';
import './dashboardnotes.css';
import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function Dashboardnotes() {

    const [noteContent, setNoteContent] = useState('');
    const [language, setLanguage] = useState('None');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const handleCreatNote = async () => {
        if (!noteContent)
            return toast.info(t("noteRequired"), { position: "top-center", autoClose: 4000, theme: "colored" });

        if (language === 'None')
            return toast.info(t("selectLangNote"), { position: "top-center", autoClose: 4000, theme: "colored" });

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/note', {
                text: noteContent,
                language: language
            });

            const summarytext = response.data.summary;
            const bulletPoints = summarytext
                .split(/\n|•|-/)
                .map(point => point.trim())
                .filter(point => point.length > 0);

            setSummary(bulletPoints);

        } catch (error) {
            console.error("Error Summarizing:", error);
            toast.warn(t("noteError"), { position: "top-center", autoClose: 4000, theme: "colored" });
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <div className="notemain">
                <h2>{t("notesTitle")}</h2>
                <div className="notemain2">
                    <div className='language-container'>
                        <label htmlFor="language">{t("selectLanguage")}:</label>
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

                    <span>{t("noteContent")}</span>
                    <textarea name="question" placeholder={t("notePlaceholder")} value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}></textarea>
                    <div className="notemainbtn">
                        <button onClick={handleCreatNote} disabled={isLoading}>
                            {isLoading ? t("summarizing") : t("createShortNote")}
                        </button>
                        <Link to={'/dashboard'}>
                            <button className='notebtn'>{t("backDashboard")}</button>
                        </Link>
                    </div>
                </div>
                {summary && (
                    <div className="summary-result" style={{ marginTop: '20px', textAlign: 'left' }} >
                        <h3 style={{ color: "#144594" }}>{t("shortNoteResult")}:</h3>
                        <div className="summary-box" style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }} >
                            <ul className="summary-list">
                                {summary.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboardnotes

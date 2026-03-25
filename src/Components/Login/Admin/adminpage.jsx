import axios from 'axios';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

function Adminpage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { t } = useTranslation();

    const handleAdmin = () => {
        localStorage.clear();
        window.location.href = '/adminlogin';
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users/all-users");
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/delete-user/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="admindashboard">
                <button style={{ color: 'white', background: '#1b458f', padding: '8px 24px', fontSize: '16px' }}
                    onClick={handleAdmin}>
                    {t("logout")}
                </button>
                <h2>{t("allUsers")}</h2>
                <div className="admindashboardinput">
                    <h3 style={{ color: '#1b458f' }}>{t("totalUsers")}: {users.length} </h3>
                    <input
                        style={{ width: '30%', padding: '10px', border: 'none', borderRadius: '12px', outline: 'none' }}
                        type="text"
                        placeholder={t("searchUsers")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>{t("name")}</th>
                            <th>{t("email")}</th>
                            <th>{t("user_name")}</th>
                            <th>{t("delete")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(user =>
                                user.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                user.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                user.username.toLowerCase().includes(search.toLocaleLowerCase())
                            )
                            .map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <button onClick={() => deleteUser(user._id)}>{t("delete")}</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Adminpage

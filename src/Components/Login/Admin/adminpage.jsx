import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Adminpage() {
    const [users, setUsers] = useState([]);

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
    return (
        <>
            <div className="admindashboard">
                <h2>All Users</h2>
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>UserName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="adminbtn">
                    <Link to={'/dashboard'} >
                        <button>Dashboard</button>
                    </Link>
                    <Link to={'/adminlogin'}>
                        <button>Back</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Adminpage

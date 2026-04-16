import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function Users() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Admin check
    if (user?.user?.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get("/api/users");
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <h2>Loading users...</h2>;

    return (
        <div>
            <h2>User List</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{u.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
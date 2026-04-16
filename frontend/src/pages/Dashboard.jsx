import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function Dashboard() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);

    // Admin check
    if (user?.user?.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    const fetchUsers = async () => {
        try {
            const res = await API.get("/api/users");
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUpdate = async () => {
        try {
            await API.put(`/api/users/${editingUser.id}`, {
                email: editingUser.email,
                role: editingUser.role,
                status: editingUser.status
            });

            setEditingUser(null);
            fetchUsers();

        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await API.delete(`/api/users/${id}`);

            // instant UI update
            fetchUsers()

        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

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
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{u.status}</td>
                            <td>
                                <button onClick={() => handleEdit(u)}>Edit</button>
                                <button onClick={() => handleDelete(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingUser && (
                <div className="bg-red-400 w-1/2 mx-auto p-10">
                    <h3>Edit User</h3>

                    <input
                        type="text"
                        value={editingUser.name}
                        disabled
                    />
                    <input
                        type="text"
                        value={editingUser.email}
                        disabled
                    />

                    <select
                        value={editingUser.role}
                        onChange={(e) =>
                            setEditingUser({ ...editingUser, role: e.target.value })
                        }
                    >
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                    </select>

                    <select
                        value={editingUser.status}
                        onChange={(e) =>
                            setEditingUser({ ...editingUser, status: e.target.value })
                        }
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
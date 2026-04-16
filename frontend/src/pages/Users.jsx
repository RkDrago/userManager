import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function Users() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Admin check
  if (user?.user?.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/api/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Users() {
  const { user } = useContext(AuthContext);

  if (user?.user?.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  return <h2>User List</h2>;
}

export default Users;
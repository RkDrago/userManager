import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  if (user?.user?.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Only admins can see this</p>
    </div>
  );
}

export default Dashboard;
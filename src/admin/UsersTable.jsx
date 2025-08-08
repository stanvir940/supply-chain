import { useEffect, useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // token saved after login
    if (!token) {
      setError("You must be logged in to view users.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5001/api/users", {
      headers: {
        Authorization: `Bearer ${token}`, // send JWT
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{ padding: "20px" }}
      className="bg-white shadow-md rounded text-black"
    >
      <h2 className="font-bold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead style={{ backgroundColor: "#f1f1f1" }}>
            <tr>
              <th style={cellStyle}>#</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>Dealer Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{user.name}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={cellStyle}>{user.dealerType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellStyle = {
  border: "2px solid black",
  padding: "8px",
  textAlign: "left",
};

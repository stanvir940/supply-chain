import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { API } = useAuth();
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await API.get("/me");
      const txRes = await API.get("/transactions");
      console.log("Users:", usersRes.data);
      console.log("Transactions:", txRes.data);
      if (usersRes.data.error || txRes.data.error) {
        console.error(
          "Error fetching data:",
          usersRes.data.error || txRes.data.error
        );
        return;
      }
      setUsers(usersRes.data);
      setTransactions(txRes.data);
    };
    fetchData();
  }, []);

  const d1Dealers = users.filter((u) => u.dealerType === "D1");
  const d2Dealers = users.filter((u) => u.dealerType === "D2");

  const d1Inventory = d1Dealers.map((d1) => {
    const dealerTx = transactions.filter((tx) => tx.userId === d1._id);
    const totalQuantity = dealerTx.reduce(
      (sum, tx) => sum + parseInt(tx.quantity),
      0
    );
    return { ...d1, inventory: totalQuantity };
  });

  const d1ToD2Tx = transactions.filter((tx) => tx.user.dealerType === "D2");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Users Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">All Users</h2>
        <div className="bg-white shadow-md rounded p-4">
          {users.map((user) => (
            <div key={user._id} className="border-b py-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Dealer Type:</strong> {user.dealerType}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* D1 Inventory Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">D1 Dealer Inventory</h2>
        <div className="bg-white shadow-md rounded p-4">
          {d1Inventory.map((d1) => (
            <div key={d1._id} className="border-b py-2">
              <p>
                <strong>Name:</strong> {d1.name}
              </p>
              <p>
                <strong>Email:</strong> {d1.email}
              </p>
              <p>
                <strong>Inventory:</strong> {d1.inventory}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Transactions D1 → D2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Transactions (D1 → D2)</h2>
        <div className="bg-white shadow-md rounded p-4">
          {d1ToD2Tx.map((tx, i) => (
            <div key={i} className="border-b py-2">
              <p>
                <strong>Seller (D1):</strong> {tx.email}
              </p>
              <p>
                <strong>Buyer (D2):</strong> {tx.user.email}
              </p>
              <p>
                <strong>Area:</strong> {tx.area}
              </p>
              <p>
                <strong>Price:</strong> {tx.price}
              </p>
              <p>
                <strong>Quantity:</strong> {tx.quantity}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder: D2 Sales */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          D2 → Future Buyers (Coming Soon)
        </h2>
        <div className="bg-white shadow-md rounded p-4 text-gray-500 italic">
          Placeholder for future D2 sales transaction tracking and analytics.
        </div>
      </section>
    </div>
  );
}

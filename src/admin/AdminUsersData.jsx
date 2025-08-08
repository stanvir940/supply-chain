import { useEffect, useState } from "react";

export default function AdminUsersData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in as admin.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5001/api/admin/users-data", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch admin data");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-600 text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 font-semibold">{error}</p>;

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Admin Dashboard - Users & Stocks
      </h2>

      {data.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-lg rounded-lg p-5 mb-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            {user.name}{" "}
            <span className="text-gray-500 text-sm">
              ({user.dealerType}) - {user.email}
            </span>
          </h3>

          {user.stockData.length === 0 ? (
            <p className="text-gray-500 italic">No stock data</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Dealer Type</th>
                    <th className="border border-gray-300 p-2">Dealer ID</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">
                      Dealer1 ID (if D2)
                    </th>
                    <th className="border border-gray-300 p-2">Weather</th>
                  </tr>
                </thead>
                <tbody>
                  {user.stockData.map((stock, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border border-gray-300 p-2">
                        {stock.date}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {stock.dealerType}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {stock.dealerId}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {stock.quantity}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {stock.price}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {stock.dealer1_id || "-"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {stock.weather || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

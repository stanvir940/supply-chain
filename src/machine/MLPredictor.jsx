import { useEffect, useState } from "react";

function MLPrediction() {
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/predict")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch prediction");
        return res.json();
      })
      .then((data) => {
        setPredictedPrice(data.predicted_price);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading prediction...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Predicted Price</h2>
      <p>{predictedPrice}</p>
    </div>
  );
}

export default MLPrediction;

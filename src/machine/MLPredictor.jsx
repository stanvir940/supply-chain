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
    <div className="card bg-slate-100 w-96 h-96 shadow-xl hover:scale-105 my-10 text-black mx-8">
      <figure className="w-full h-full">
        <img
          src="https://produits.bienmanger.com/36700-0w0h0_Organic_Red_Onion_From_Italy.jpg"
          alt={`Onion`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Onion
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="text-sm">
          Onions are versatile vegetables known for their strong flavor and
          aroma, commonly used to enhance.
        </p>
        <p className="text-xl  font-bold">
          {" "}
          Estimated Price:{" "}
          <span className="text-blue-700">{predictedPrice} </span>
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fresh Product</div>
        </div>
      </div>
    </div>
  );
}

export default MLPrediction;

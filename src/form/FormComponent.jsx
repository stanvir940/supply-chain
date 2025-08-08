import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext.jsx";

const FormComponent = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    dealerType: "", // D1 or D2
    quantity: "",
    price: "", // buying price for both D1 & D2
    price_selling: "", // only for D2
    weather: "", // only for D2
    dealer1_id: "", // only for D2
  });

  const [dealerId, setDealerId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Auto-generate dealer ID and date on dealerType change or mount
    const generateDealerId = () => {
      const randomNum = Math.floor(Math.random() * 100);
      return `${formData.dealerType || "D1"}_${randomNum}`;
    };

    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    setDealerId(generateDealerId());
  }, [formData.dealerType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const isD1 = formData.dealerType === "D1";

    // Build payload with correct fields
    const payload = {
      date,
      dealerType: formData.dealerType,
      quantity: formData.quantity,
      user: user?.name || "Unknown",
      dealerId,
      price: formData.price,
      ...(isD1
        ? {}
        : {
            dealer1_id: formData.dealer1_id,
            price_selling: formData.price_selling,
            weather: formData.weather,
          }),
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/data",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
      Swal.fire("Success!", "Data saved successfully", "success");
      // Reset form after success
      setFormData({
        dealerType: "",
        quantity: "",
        price: "",
        price_selling: "",
        weather: "",
        dealer1_id: "",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: "Check console for details",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-4 bg-white text-black p-4 rounded-lg shadow-md"
    >
      <div className="w-full text-center text-3xl font-bold mb-4">
        Product Transaction Form
      </div>

      {/* Dealer Type Selector */}
      <label className="block font-semibold">Dealer Type</label>
      <select
        name="dealerType"
        value={formData.dealerType}
        onChange={handleChange}
        className="input input-bordered w-full bg-white"
        required
      >
        <option value="">Select Type</option>
        <option value="D1">D1 (Buys from farmers)</option>
        <option value="D2">D2 (Buys from D1)</option>
      </select>

      {/* Quantity */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        Quantity
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="grow"
          placeholder="Quantity in KG"
          required
          min={1}
        />
      </label>

      {/* Price per KG */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        {formData.dealerType === "D1"
          ? "Buying Price from Farmer"
          : formData.dealerType === "D2"
          ? "Buying Price from Dealer 1"
          : "Price per KG"}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="grow"
          placeholder="Price in BDT"
          required={!!formData.dealerType}
          min={0}
          step="0.01"
        />
      </label>

      {/* For D2 only: Selling price */}
      {formData.dealerType === "D2" && (
        <label className="input input-bordered flex items-center gap-2 bg-white">
          Selling Price to Customer
          <input
            type="number"
            name="price_selling"
            value={formData.price_selling}
            onChange={handleChange}
            className="grow"
            placeholder="Price in BDT"
            required
            min={0}
            step="0.01"
          />
        </label>
      )}

      {/* For D2 only: Dealer1 ID and Weather */}
      {formData.dealerType === "D2" && (
        <>
          <label className="input input-bordered flex items-center gap-2 bg-white">
            Dealer 1 ID
            <input
              type="text"
              name="dealer1_id"
              value={formData.dealer1_id}
              onChange={handleChange}
              className="grow"
              placeholder="Example: D1_33"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 bg-white">
            Weather
            <input
              type="text"
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              className="grow"
              placeholder="Example: good / bad"
              required
            />
          </label>
        </>
      )}

      {/* Auto-generated dealer ID and date */}
      <div className="mt-4 text-sm text-gray-700">
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Your Dealer ID:</strong> {dealerId}
        </p>
      </div>

      {/* Submit */}
      <div className="w-full text-center mt-4">
        <button type="submit" className="btn btn-primary w-1/3">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;

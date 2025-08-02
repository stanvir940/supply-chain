import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    area: "",
    quantity: "",
    randomString: "",
  });

  const [randomString, setRandomString] = useState("");

  // Function to generate a random string
  const generateRandomString = () => {
    const length = 10;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setRandomString(result);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, price, area, quantity, randomString } = formData;

    const data = { name, price, area, quantity, randomString };
    console.log("Submitting data:", data);

    try {
      const response = await axios.post("http://localhost:5001/api/data", data);
      console.log("Response:", response.data);
      Swal.fire("Submitted!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-4 bg-white text-black p-4 rounded-lg shadow-md"
    >
      <div className="w-full text-center text-4xl font-bold my-8 text-black">
        <h1>Buy product from Farmer</h1>
      </div>
      {/* Name Input */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="grow"
          placeholder="Daisy"
        />
      </label>

      {/* Price Input */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        Price
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="grow"
          placeholder="Price in BDT"
        />
      </label>

      {/* Area Input */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        Area
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="grow"
          placeholder="Area"
        />
      </label>

      {/* Quantity Input */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        Quantity
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="grow"
          placeholder="Quantity"
        />
      </label>

      {/* Random String Generator */}
      <div className="input input-bordered flex items-center gap-2 bg-white">
        <input
          type="text"
          name="randomString"
          value={randomString}
          placeholder="Generated String"
          readOnly
          className="grow"
        />
        <button
          type="button"
          onClick={generateRandomString}
          className="btn btn-primary"
        >
          Generate
        </button>
      </div>

      {/* Submit Button */}
      <div className="w-full text-center">
        <button type="submit" className="btn btn-primary w-1/3">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;

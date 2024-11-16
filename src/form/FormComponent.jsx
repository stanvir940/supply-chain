import { useState } from "react";

const FormComponent = () => {
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
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    search: "",
    optionalSearch: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any desired actions with the form data here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-4 bg-white">
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

      {/* Email Input */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        Price
        <input
          type="number"
          name="price"
          value={formData.email}
          onChange={handleChange}
          className="grow"
          placeholder="price in bdt"
        />
      </label>

      {/* Search Input with Keyboard Shortcut */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        <input
          type="text"
          name="area"
          value={formData.search}
          onChange={handleChange}
          className="grow"
          placeholder="Area"
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>

      {/* Optional Search Input */}
      <label className="input input-bordered flex items-center gap-2 bg-white">
        <input
          type="text"
          name="optionalSearch"
          value={formData.optionalSearch}
          onChange={handleChange}
          className="grow"
          placeholder="Quantity"
        />
        <span className="badge badge-info">Optional</span>
      </label>
      {/* for experiment */}
      <div className="input input-bordered flex items-center gap-2 bg-white">
        <input
          type="text"
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

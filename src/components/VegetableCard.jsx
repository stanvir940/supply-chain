import { useState } from "react";
import PropTypes from "prop-types";

export default function VegetableCard({ vegetable }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-48 rounded-lg shadow-lg overflow-hidden bg-white border hover:shadow-xl transition "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={vegetable.image}
        alt={vegetable.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-3 text-center">
        <h3 className="text-lg font-semibold">{vegetable.name}</h3>
        <p className="text-green-600 text-md">৳ {vegetable.prices.today} /kg</p>
      </div>

      {hovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-3 flex flex-col justify-center items-center text-sm">
          <p>Today: ৳ {vegetable.prices.today}</p>
          <p>Tomorrow: ৳ {vegetable.prices.tomorrow}</p>
          <p>Day After Tomorrow: ৳ {vegetable.prices.dayAfterTomorrow}</p>
          <p>Next Week: ৳ {vegetable.prices.nextWeek}</p>
        </div>
      )}
    </div>
  );
}

// ✅ Add this section:
VegetableCard.propTypes = {
  vegetable: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    prices: PropTypes.shape({
      today: PropTypes.number.isRequired,
      tomorrow: PropTypes.number.isRequired,
      dayAfterTomorrow: PropTypes.number.isRequired,
      nextWeek: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

import { useEffect, useState } from "react";
import VegetableCard from "./VegetableCard";
import axios from "axios";

const dummyVegetables = [
  {
    name: "Potato",
    image: "./potato.jpg",
    prices: { today: 22, tomorrow: 23, dayAfterTomorrow: 24, nextWeek: 25 },
  },
  {
    name: "Tomato",
    image: "./tomato.jpg",
    prices: { today: 30, tomorrow: 29, dayAfterTomorrow: 28, nextWeek: 27 },
  },
  {
    name: "Carrot",
    image: "./Carrot.webp",
    prices: { today: 40, tomorrow: 39, dayAfterTomorrow: 38, nextWeek: 37 },
  },
  {
    name: "Potato",
    image: "./potato.jpg",
    prices: { today: 22, tomorrow: 23, dayAfterTomorrow: 24, nextWeek: 25 },
  },
  {
    name: "Tomato",
    image: "./tomato.jpg",
    prices: { today: 30, tomorrow: 29, dayAfterTomorrow: 28, nextWeek: 27 },
  },
  {
    name: "Carrot",
    image: "./Carrot.webp",
    prices: { today: 40, tomorrow: 39, dayAfterTomorrow: 38, nextWeek: 37 },
  },
  {
    name: "Potato",
    image: "./potato.jpg",
    prices: { today: 22, tomorrow: 23, dayAfterTomorrow: 24, nextWeek: 25 },
  },
  {
    name: "Tomato",
    image: "./tomato.jpg",
    prices: { today: 30, tomorrow: 29, dayAfterTomorrow: 28, nextWeek: 27 },
  },
  {
    name: "Carrot",
    image: "./Carrot.webp",
    prices: { today: 40, tomorrow: 39, dayAfterTomorrow: 38, nextWeek: 37 },
  },
];

export default function VegetableSlider() {
  const [onionData, setOnionData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/vegetables/onion")
      .then((res) => {
        const data = res.data;
        setOnionData({
          name: "Onion",
          image: "./onion.jpg",
          prices: {
            today: data.today_price,
            tomorrow: data.tomorrow_price,
            dayAfterTomorrow: data.day_after_tomorrow_price,
            nextWeek: data.next_week_price,
          },
        });
      })
      .catch((err) => {
        console.error("Failed to load onion data", err);
      });
  }, []);

  const allVegetables = onionData
    ? [onionData, ...dummyVegetables]
    : dummyVegetables;

  return (
    <div className="overflow-x-auto whitespace-nowrap p-4 carousel carousel-center my-4 mt-6">
      <div className="flex gap-4 carousel-item">
        {allVegetables.map((veg, index) => (
          <VegetableCard key={index} vegetable={veg} />
        ))}
      </div>
    </div>
  );
}

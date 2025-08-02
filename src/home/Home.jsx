import Card from "../card/Card";

const Home = () => {
  const vegetableDataSet = [
    {
      title: "Fresh Broccoli",
      imageUrl:
        "https://www.allrecipes.com/thmb/01OsKBnYA8USlkV4Mqm6543C9fo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-691088799-2000-16d197c7cb4e4c48bb518e3931f52a98.jpg",
      altText: "Broccoli",
      description:
        "Broccoli is a nutrient-packed vegetable great for your health.",
      badges: ["Green", "Rich in Fiber"],
    },
    {
      title: "Red Bell Pepper",
      imageUrl:
        "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/bell-peppers-1296x728-feature.jpg?w=1155&h=1528",
      altText: "Bell Pepper",
      description: "Bright and sweet red bell peppers add flavor to any dish.",
      badges: ["Vitamin C", "Low Calorie"],
    },
    {
      title: "Organic Carrots",
      imageUrl:
        "https://www.greendna.in/cdn/shop/products/carrot-410670_1280-e1535073548523_960x.jpg?v=1632668896",
      altText: "Carrots",
      description: "Crunchy organic carrots, perfect for snacking and cooking.",
      badges: ["Beta Carotene", "Eye Health"],
    },
    {
      title: "Leafy Spinach",
      imageUrl:
        "https://www.bonza.dog/wp-content/uploads/Is-Spinach-Good-for-Dogs-Health--600x400.webp",
      altText: "Spinach",
      description:
        "Spinach is a superfood rich in iron and essential vitamins.",
      badges: ["Iron-Rich", "Low Fat"],
    },
    {
      title: "Juicy Tomatoes",
      imageUrl:
        "https://media.istockphoto.com/id/847335116/photo/tomatoes-on-the-vine.jpg?s=612x612&w=0&k=20&c=XspM2ySvUfqjnt7HL5qKyn0tyRb5qLsf1GAP6-3xQsw=",
      altText: "Tomatoes",
      description: "Ripe, juicy tomatoes, perfect for salads and cooking.",
      badges: ["Antioxidant", "Versatile"],
    },
  ];

  const features = [
    {
      img: "/i-1.jpg",
      title: "Farm-Fresh Vegetables",
      description:
        "Straight from the field to your plate. We bring you the freshest picks of the season, handpicked every morning.",
    },
    {
      img: "/i-2.jpg",
      title: "100% Organic",
      description:
        "Say goodbye to harmful chemicals. All our vegetables are grown using sustainable and organic farming practices.",
    },
    {
      img: "/i-3.png",
      title: "Super Fast Delivery",
      description:
        "Get your veggies delivered in under 60 minutes! We value your time as much as your health.",
    },
    {
      img: "/i-4.jpg",
      title: "Save More with Us",
      description:
        "Affordable prices, no middlemen. We ensure you get premium quality at the lowest market rates.",
    },
  ];
  return (
    <div className="flex  flex-col space-y-4">
      <div className="space-y-2 flex w-full justify-between p-4">
        <div className="text-3xl w-full font-bold text-black text-center justify-center items-center">
          <h1>Todays Products</h1>
        </div>
        {/* <div>
          <input
            type="text"
            placeholder="Search Products"
            className="input input-bordered input-success w-full max-w-xs bg-white"
          />
        </div> */}
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Featured Vegetables
        </h2>
        <div className="flex flex-1 flex-col align-middle items-center">
          <div>
            <h2 className="text-4xl font-bold text-center mb-12 text-green-700">
              Why Shop With Us?
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-32 h-32 object-contain"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-400 w-1/2 p-2 text-center text-white font-bold text-2xl mt-8 hover:scale-105 hover:bg-green-700">
            <button>Buy Now</button>
          </div>
        </div>
      </div>

      {/* vegetable sets */}
      <div className="w-full grid grid-cols-2 justify-center items-center border-y-2">
        {vegetableDataSet.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            imageUrl={item.imageUrl}
            altText={item.altText}
            description={item.description}
            badges={item.badges}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

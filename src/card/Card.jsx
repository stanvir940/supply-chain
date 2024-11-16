const Card = ({ title, imageUrl, altText, description, badges }) => {
  return (
    <div className="card bg-slate-100 w-96 h-96 shadow-xl hover:scale-105 my-10 text-black mx-8">
      <figure>
        <img src={imageUrl} alt={altText} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          {badges.map((badge, index) => (
            <div key={index} className="badge badge-outline">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;

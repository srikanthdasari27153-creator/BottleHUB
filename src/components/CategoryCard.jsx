import { useNavigate } from "react-router-dom";

function CategoryCard({ name, icon }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${name}`)}
      className="bg-black border border-yellow-500 rounded-xl p-8 text-center hover:scale-105 duration-300 cursor-pointer"
    >
      <div className="text-5xl">{icon}</div>

      <h3 className="text-white text-xl font-semibold mt-4">
        {name}
      </h3>
    </div>
  );
}

export default CategoryCard;
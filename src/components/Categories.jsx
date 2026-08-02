import CategoryCard from "./CategoryCard";

function Categories() {
  const categories = [
    { name: "Whisky", icon: "🥃" },
    { name: "Beer", icon: "🍺" },
    { name: "Wine", icon: "🍷" },
    { name: "Vodka", icon: "🍸" },
    { name: "Brandy", icon: "🥃" },
    { name: "Rum", icon: "🍹" },
    { name: "Gin", icon: "🍸" },
    { name: "Water Bottle", icon: "💧" },
    { name: "Glass", icon: "🥛" },
  ];

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-10">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              icon={category.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import ProductCard from "../components/ProductCard";

import defaultProducts from "../data/products";

function Products() {
  const { category } = useParams();
  const { search } = useContext(SearchContext);

  // Admin added products
  const adminProducts =
    JSON.parse(localStorage.getItem("products")) || [];

  // Merge default + admin products
  const allProducts = [...defaultProducts, ...adminProducts];

  const filteredProducts = allProducts.filter((item) => {
    const categoryMatch = category
      ? item.category.toLowerCase() === category.toLowerCase()
      : true;

    const searchMatch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <section className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl text-yellow-400 font-bold text-center mb-10">
          {category ? `${category} Collection` : "All Products"}
        </h1>

        {filteredProducts.length === 0 ? (
          <h2 className="text-center text-white text-2xl">
            No Products Found
          </h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Products;
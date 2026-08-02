import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Products() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Category filter
  const categoryProducts = category
    ? products.filter(
        (item) =>
          item.category.toLowerCase() === category.toLowerCase()
      )
    : products;
  
  // Search filter
  const filteredProducts = categoryProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <section className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <h1 className="text-4xl text-yellow-400 font-bold text-center mb-8">
          {category ? `${category} Collection` : "All Products"}
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-zinc-900 text-white border border-yellow-500 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl text-white font-semibold">
              No products found
            </h2>
            <p className="text-gray-400 mt-3">
              Try a different search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
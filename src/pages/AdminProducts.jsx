import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  const [form, setForm] = useState({
    name: "",
    category: "",
    image: "",
    stock: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    const { name, category, image, stock, price } = form;

    if (!name || !category || !image || !stock || !price) {
      alert("Please fill all fields");
      return;
    }

    let updatedProducts;

    if (editId) {
      updatedProducts = products.map((item) =>
        item.id === editId
          ? {
              ...item,
              name,
              category,
              image,
              stock: Number(stock),
              price: Number(price),
            }
          : item
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name,
        category,
        image,
        stock: Number(stock),
        price: Number(price),
      };

      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("✅ Product Added Successfully");

    setEditId(null);

    setForm({
      name: "",
      category: "",
      image: "",
      stock: "",
      price: "",
    });
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(
      (item) => item.id !== id
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("🗑️ Product Deleted Successfully");
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      image: product.image,
      stock: product.stock,
      price: product.price,
    });

    setEditId(product.id);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-yellow-500 p-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          🍾 BottleHub
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Admin Panel
        </p>

        <div className="mt-10 space-y-5">

          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left hover:text-yellow-400"
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => navigate("/admin-orders")}
            className="w-full text-left hover:text-yellow-400"
          >
            📦 Orders
          </button>

          <div className="bg-yellow-500 text-black rounded-lg p-3 font-bold">
            🍾 Products
          </div>

          <button
            onClick={() => navigate("/admin-customers")}
            className="w-full text-left hover:text-yellow-400"
          >
            👥 Customers
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              navigate("/admin-login");
            }}
            className="w-full text-left text-red-400 hover:text-red-500"
          >
            🚪 Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-yellow-400 mb-10">
          Add Product
        </h1>

        <div className="bg-zinc-900 rounded-xl p-8 border border-yellow-500 max-w-3xl">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded bg-zinc-800"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded bg-zinc-800"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded bg-zinc-800"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded bg-zinc-800"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full mb-6 p-3 rounded bg-zinc-800"
          />

          <button
            onClick={handleAddProduct}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>

        </div>

        <div className="mt-12">

          <h2 className="text-3xl text-yellow-400 mb-5">
            Added Products
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-400">
              No Products Added
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {products.map((item) => (

                <div
                  key={item.id}
                  className="bg-zinc-900 rounded-xl p-4 border border-yellow-500"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-contain bg-white rounded"
                  />

                  <h3 className="mt-3 text-xl font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="text-gray-400">
                    {item.category}
                  </p>

                  <p className="text-green-400 mt-2 font-semibold">
                    Stock : {item.stock}
                  </p>

                  <p className="text-yellow-400 text-2xl font-bold mt-2">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold"
                  >
                    Delete Product
                  </button>

                  <button
                    onClick={() => handleEdit(item)}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold"
                  >
                    Edit Product
                  </button>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminProducts;
import React, { useEffect, useState } from 'react';

function AdminProducts() {
  const stores = [1, 2, 3]; // Example list of stores

  const [listProduct, setlistProduct] = useState([]);
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100, stock: 50, type: 'Type A', expiration: '2024-12-31', images: [], unit: 'kg', origin: 'Vietnam', store: 'Store A' },
    { id: 2, name: 'Product 2', price: 200, stock: 30, type: 'Type B', expiration: '2025-01-15', images: [], unit: 'liters', origin: 'Vietnam', store: 'Store B' },
    { id: 3, name: 'Product 3', price: 150, stock: 20, type: 'Type C', expiration: '2024-11-20', images: [], unit: 'pcs', origin: 'Vietnam', store: 'Store A' },
  ]);
  useEffect(() => {
    const id_store = selectedStore;
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get_product_store/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_store }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
       
        if (result.products_with_stock) {
          setlistProduct(result.products_with_stock);
          console.log('Product fetched successfully:', listProduct);

        } else {
          console.log('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCartItems();
  }, [selectedStore]);


  console.log(listProduct);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    type: '',
    expiration: '',
    images: [],
    unit: '',
    origin: '',
    store: selectedStore,
  });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.type || !newProduct.expiration || !newProduct.unit || !newProduct.origin) {
      alert('Please fill in all fields.');
      return;
    }

    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProductData = {
      ...newProduct,
      id: newId,
      images: newProduct.images.map((image) => URL.createObjectURL(image)),
      store: selectedStore,
    };

    setProducts([...products, newProductData]);
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      type: '',
      expiration: '',
      images: [],
      unit: '',
      origin: '',
      store: selectedStore,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      alert('Bạn chỉ được tải lên tối đa 4 hình ảnh.');
      return;
    }

    setNewProduct((prev) => ({ ...prev, images: files }));
  };

  const handleEdit = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, name: 'Updated Product' } : product
    );
    setProducts(updatedProducts);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const filteredProducts = products.filter((product) => product.store === selectedStore);

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md shadow-lg">
        Quản lý Sản Phẩm
      </h2>

      <div className="mb-6">
        <label htmlFor="store-select" className="mr-2">Chọn Cửa Hàng:</label>
        <select
          id="store-select"
          value={selectedStore}
          onChange={handleStoreChange}
          className="border px-2 py-1"
        >
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          name="name"
          placeholder="Tên Sản Phẩm"
          value={newProduct.name}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={newProduct.price}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="number"
          name="stock"
          placeholder="Tồn Kho"
          value={newProduct.stock}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="type"
          placeholder="Loại"
          value={newProduct.type}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="unit"
          placeholder="Đơn Vị"
          value={newProduct.unit}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="origin"
          placeholder="Nguồn Gốc"
          value={newProduct.origin}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="date"
          name="expiration"
          value={newProduct.expiration}
          onChange={handleChange}
          className="border px-2 py-1"
        />

        {/* Custom Styled File Input */}
        <div className="relative">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            multiple
          />
          <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 shadow-blue-500/50 rounded-full">
            Chọn Hình Ảnh (Tối đa 4)
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 shadow-blue-500/50 rounded-full"
        >
          Thêm Sản Phẩm
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-center">ID</th>
            <th className="py-3 px-4 border-b text-center">Tên Sản Phẩm</th>
            <th className="py-3 px-4 border-b text-center">Giá</th>
            <th className="py-3 px-4 border-b text-center">Tồn Kho</th>
            <th className="py-3 px-4 border-b text-center">Đơn Vị</th>
            <th className="py-3 px-4 border-b text-center">Nguồn Gốc</th>
            <th className="py-3 px-4 border-b text-center">Hạn Sử Dụng</th>
            <th className="py-3 px-4 border-b text-center">Hình Ảnh</th>
            <th className="py-3 px-4 border-b text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {listProduct?.map((pro) => (
            <tr key={pro.ProductID} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center">{pro.product.ProductID}</td>
              <td className="py-3 px-4 border-b text-center">{pro.product.Name}</td>
              <td className="py-3 px-4 border-b text-center">{pro.product.Price}</td>
              <td className="py-3 px-4 border-b text-center">{pro.stock}</td>
              <td className="py-3 px-4 border-b text-center">{pro.product.Unit}</td>
              <td className="py-3 px-4 border-b text-center">{pro.product.Origin}</td>
              <td className="py-3 px-4 border-b text-center">{pro.product.ExpirationDate}</td>
              <td className="py-3 px-4 border-b text-center">
                {pro.product.ImageID.map((image, index) => (
                  <img key={index} src={`/image/product/${image}`} alt={`Product ${index}`} className="w-12 h-12 object-cover inline-block" />
                ))}
              </td>
              <td className="py-3 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;

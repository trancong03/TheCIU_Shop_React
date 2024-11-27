import React, { useState } from 'react';

const AdminStores = () => {
  const [stores, setStores] = useState([
    { id: 1, name: 'Cửa hàng A', address: 'Địa chỉ A', email: 'a@example.com', hotline: '0901234567' },
    { id: 2, name: 'Cửa hàng B', address: 'Địa chỉ B', email: 'b@example.com', hotline: '0907654321' },
  ]);

  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    email: '',
    hotline: '',
  });

  const handleAdd = () => {
    if (!newStore.name || !newStore.address || !newStore.email || !newStore.hotline) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newId = stores.length > 0 ? Math.max(...stores.map((s) => s.id)) + 1 : 1;

    const newStoreData = {
      ...newStore,
      id: newId,
    };

    setStores([...stores, newStoreData]);
    setNewStore({
      name: '',
      address: '',
      email: '',
      hotline: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
    const updatedStores = stores.map((store) =>
      store.id === id ? { ...store, name: 'Updated Name' } : store
    );
    setStores(updatedStores);
  };

  const handleDelete = (id) => {
    const updatedStores = stores.filter((store) => store.id !== id);
    setStores(updatedStores);
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md shadow-lg">
        Quản lý Cửa Hàng
      </h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          name="name"
          placeholder="Tên Cửa Hàng"
          value={newStore.name}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="address"
          placeholder="Địa Chỉ"
          value={newStore.address}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newStore.email}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="hotline"
          placeholder="Hotline"
          value={newStore.hotline}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 shadow-blue-500/50 rounded-full"
        >
          Thêm Cửa Hàng
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-center">ID</th>
            <th className="py-3 px-4 border-b text-center">Tên</th>
            <th className="py-3 px-4 border-b text-center">Địa Chỉ</th>
            <th className="py-3 px-4 border-b text-center">Email</th>
            <th className="py-3 px-4 border-b text-center">Hotline</th>
            <th className="py-3 px-4 border-b text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center">{store.id}</td>
              <td className="py-3 px-4 border-b text-center">{store.name}</td>
              <td className="py-3 px-4 border-b text-center">{store.address}</td>
              <td className="py-3 px-4 border-b text-center">{store.email}</td>
              <td className="py-3 px-4 border-b text-center">{store.hotline}</td>
              <td className="py-3 px-4 border-b text-center">
                <button onClick={() => handleEdit(store.id)} className="bg-blue-500 text-white px-2 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(store.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStores;

import React, { useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', address: 'Hà Nội', phone: '0123456789', dob: '1990-01-01', email: 'a@example.com', gender: 'Nam', store: 'Cửa hàng A' },
    { id: 2, name: 'Trần Thị B', address: 'Đà Nẵng', phone: '0987654321', dob: '1992-05-15', email: 'b@example.com', gender: 'Nữ', store: 'Cửa hàng B' },
    { id: 3, name: 'Lê Văn C', address: 'TP.HCM', phone: '0112233445', dob: '1988-08-20', email: 'c@example.com', gender: 'Nam', store: 'Cửa hàng C' },
  ]);

  const [stores, setStores] = useState(['Cửa hàng A', 'Cửa hàng B', 'Cửa hàng C']);
  const [selectedStore, setSelectedStore] = useState(''); // State để lưu cửa hàng đã chọn

  const [newUser, setNewUser] = useState({
    name: '',
    address: '',
    phone: '',
    dob: '',
    email: '',
    gender: '',
    store: '',
  });

  const handleAdd = () => {
    if (!newUser.name || !newUser.address || !newUser.phone || !newUser.dob || !newUser.email || !newUser.gender || !newUser.store) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUserData = {
      ...newUser,
      id: newId,
    };

    setUsers([...users, newUserData]);
    setNewUser({
      name: '',
      address: '',
      phone: '',
      dob: '',
      email: '',
      gender: '',
      store: selectedStore, // Gán cửa hàng đã chọn cho user mới
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value); // Cập nhật cửa hàng đã chọn
  };

  const handleEdit = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name: 'Updated User' } : user
    );
    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Lọc người dùng theo cửa hàng đã chọn
  const filteredUsers = selectedStore
    ? users.filter((user) => user.store === selectedStore)
    : users;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md shadow-lg">
        Quản lý Người Dùng
      </h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <select
          value={selectedStore}
          onChange={handleStoreChange}
          className="border px-2 py-1"
        >
          <option value="">Chọn Cửa Hàng</option>
          {stores.map((store, index) => (
            <option key={index} value={store}>
              {store}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Tên"
          value={newUser.name}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="address"
          placeholder="Địa Chỉ"
          value={newUser.address}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="phone"
          placeholder="Số Điện Thoại"
          value={newUser.phone}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="date"
          name="dob"
          value={newUser.dob}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <select
          name="gender"
          value={newUser.gender}
          onChange={handleChange}
          className="border px-2 py-1"
        >
          <option value="">Giới Tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>

        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 shadow-blue-500/50 rounded-full"
        >
          Thêm Người Dùng
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-center">ID</th>
            <th className="py-3 px-4 border-b text-center">Tên</th>
            <th className="py-3 px-4 border-b text-center">Địa Chỉ</th>
            <th className="py-3 px-4 border-b text-center">Số Điện Thoại</th>
            <th className="py-3 px-4 border-b text-center">Ngày Sinh</th>
            <th className="py-3 px-4 border-b text-center">Email</th>
            <th className="py-3 px-4 border-b text-center">Giới Tính</th>
            <th className="py-3 px-4 border-b text-center">Cửa Hàng</th>
            <th className="py-3 px-4 border-b text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center">{user.id}</td>
              <td className="py-3 px-4 border-b text-center">{user.name}</td>
              <td className="py-3 px-4 border-b text-center">{user.address}</td>
              <td className="py-3 px-4 border-b text-center">{user.phone}</td>
              <td className="py-3 px-4 border-b text-center">{user.dob}</td>
              <td className="py-3 px-4 border-b text-center">{user.email}</td>
              <td className="py-3 px-4 border-b text-center">{user.gender}</td>
              <td className="py-3 px-4 border-b text-center">{user.store}</td>
              <td className="py-3 px-4 border-b text-center">
                <button onClick={() => handleEdit(user.id)} className="bg-blue-500 text-white px-2 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;

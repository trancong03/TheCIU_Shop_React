import React, { useState } from 'react';

const AdminAccount = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, role: 'Admin', username: 'admin1', password: 'pass123', store: 'Cửa hàng A' },
    { id: 2, role: 'Nhân viên', username: 'nv1', password: 'pass456', store: 'Cửa hàng B' },
    { id: 3, role: 'Quản lý', username: 'ql1', password: 'pass789', store: 'Cửa hàng C' },
  ]);

  const [stores, setStores] = useState(['Cửa hàng A', 'Cửa hàng B', 'Cửa hàng C']);
  const [selectedStore, setSelectedStore] = useState('');

  const [newAccount, setNewAccount] = useState({
    role: '',
    username: '',
    password: '',
    store: '',
  });

  const handleAdd = () => {
    if (!newAccount.role || !newAccount.username || !newAccount.password || !selectedStore) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newId = accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1;

    const newAccountData = {
      ...newAccount,
      id: newId,
      store: selectedStore,
    };

    setAccounts([...accounts, newAccountData]);
    setNewAccount({
      role: '',
      username: '',
      password: '',
      store: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleEdit = (id) => {
    const updatedAccounts = accounts.map((account) =>
      account.id === id ? { ...account, role: 'Updated Role' } : account
    );
    setAccounts(updatedAccounts);
  };

  const handleDelete = (id) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts);
  };

  const filteredAccounts = selectedStore
    ? accounts.filter((account) => account.store === selectedStore)
    : accounts;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md shadow-lg">
        Quản lý Tài Khoản
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
          name="role"
          placeholder="Role"
          value={newAccount.role}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newAccount.username}
          onChange={handleChange}
          className="border px-2 py-1"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newAccount.password}
          onChange={handleChange}
          className="border px-2 py-1"
        />

        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 shadow-blue-500/50 rounded-full"
        >
          Thêm Tài Khoản
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-center">ID</th>
            <th className="py-3 px-4 border-b text-center">Role</th>
            <th className="py-3 px-4 border-b text-center">Username</th>
            <th className="py-3 px-4 border-b text-center">Password</th>
            <th className="py-3 px-4 border-b text-center">Cửa Hàng</th>
            <th className="py-3 px-4 border-b text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center">{account.id}</td>
              <td className="py-3 px-4 border-b text-center">{account.role}</td>
              <td className="py-3 px-4 border-b text-center">{account.username}</td>
              <td className="py-3 px-4 border-b text-center">{account.password}</td>
              <td className="py-3 px-4 border-b text-center">{account.store}</td>
              <td className="py-3 px-4 border-b text-center">
                <button onClick={() => handleEdit(account.id)} className="bg-blue-500 text-white px-2 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(account.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAccount;

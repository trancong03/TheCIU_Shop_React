// src/Pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { SidebarItem } from '../Components/Sidebar';
import { LayoutDashboard, Package, Receipt, UserCircle } from 'lucide-react';
import AdminProducts from './Admin/AdminProducts';
import AdminUsers from './Admin/AdminUsers'
import AdminAccount from './Admin/AdminAccount';
import AdminStores from './Admin/AdminStores';
function Admin() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-2">
        <Sidebar>
          <NavLink to="/admin/products">
            <SidebarItem icon={<LayoutDashboard size={25} />} text="Sản Phẩm" active={pathname === '/admin/products'} />
          </NavLink>
          <NavLink to="/admin/customers">
            <SidebarItem icon={<UserCircle size={25} />} text="Khách Hàng" active={pathname === '/admin/customers'} />
          </NavLink>
          <NavLink to="/admin/stores">
            <SidebarItem icon={<Package size={25} />} text="Cửa Hàng" active={pathname === '/admin/stores'} />
          </NavLink>
          <NavLink to="/admin/orders">
            <SidebarItem icon={<Receipt size={25} />} text="Đơn Hàng" active={pathname === '/admin/orders'} />
          </NavLink>
          <NavLink to="/admin/account">
            <SidebarItem icon={<UserCircle size={25} />} text="Tài khoản" active={pathname === '/admin/account'} />
          </NavLink>
          
        </Sidebar>
      </div>
      <div className="col-span-10">
        <Routes>
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminUsers />} />
          <Route path="stores" element={<AdminStores/>} />
          <Route path="orders" element={<div>Đơn Hàng Page</div>} />
          <Route path="account" element={<AdminAccount/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;

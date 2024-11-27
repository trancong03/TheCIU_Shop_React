// src/Components/AdminLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer"; // Đảm bảo đường dẫn đúng nếu Footer nằm trong Components

const AdminLayout = () => {
  return (
    <div>
      {/* Bạn có thể thêm Header hoặc các thành phần khác cho Admin nếu cần */}
      <Outlet /> {/* Để render các route con cho Admin */}
      <Footer />
    </div>
  );
};

export default AdminLayout;

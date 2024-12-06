import { CircleCheckBig } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

// Tạo Context
const AlertContext = createContext();

// Custom hook để sử dụng Alert Context
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

    // Hàm hiển thị Alert
    const showAlert = (message, type = "success") => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: "", type: "success" }), 3000); // Tự ẩn sau 3 giây
    };

    // Hàm đóng Alert
    const closeAlert = () => setAlert({ show: false, message: "", type: "success" });

    return (
        <AlertContext.Provider value={{ showAlert, closeAlert }}>
            {children}
            {alert.show && (
                <div
                    className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-black
                    ${alert.type === "success" ? "bg-white  text-green-600" : alert.type === "error" ? "bg-red-500" : "bg-gray-500"}
                    transform transition-all duration-500 ease-in-out
                    ${alert.show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
                `}
                >
                    <div className="flex items-center ">
                        <CircleCheckBig className="mr-4 text-xl  font-bold"/>
                        <span className="text-black font-bold">{alert.message}</span>
                    </div>
                </div>

            )}
        </AlertContext.Provider>
    );
};

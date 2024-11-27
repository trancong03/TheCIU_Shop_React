import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import LocationSelector from "../ui/LocationSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/CardContext";

const NewAddressForm = ({ address, onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [addressValue, setAddressValue] = useState(""); // Đổi tên biến để tránh xung đột với prop
    const { create_delivery_address } = useCart();

    // Sử dụng useEffect để điền thông tin nếu có địa chỉ chỉnh sửa
    useEffect(() => {
        if (address) {
            setName(address.RecipientName || "");
            setPhone(address.PhoneNumber || "");
            setAddressValue(address.DeliveryAddress || "");
        }
    }, [address]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && phone && addressValue) {
            onSubmit({
                DeliveryAddress: addressValue,
                RecipientName: name,
                PhoneNumber: phone,
            });
            setName("");
            setPhone("");
            setAddressValue("");
            onClose(); // Đóng form sau khi thêm hoặc cập nhật địa chỉ
        } else {
            alert("Vui lòng nhập đầy đủ thông tin!");
        }
    };


    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const toggleLocationSelector = () => {
        setShowLocationSelector(!showLocationSelector);
    };

    const updateAddress = (newAddress) => {
        setAddressValue(newAddress);
        toggleLocationSelector();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">{address ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">
                            Họ tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Nhập họ tên"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="phone">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Nhập số điện thoại"
                            required
                        />
                    </div>

                    <div className="mb-4 border rounded-md">
                        <label className="block text-sm text-slate-400 font-bold">
                            Địa chỉ <span className="text-red-500">*</span>
                        </label>
                        <div className='flex text-slate-500'>
                            <input
                                type="text"
                                id="address"
                                value={addressValue}
                                name="address"
                                readOnly
                                onClick={toggleLocationSelector}
                                className="w-full focus:outline-none"
                            />
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        {address ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
                    </button>
                </form>
            </div>
            {showLocationSelector && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-[50vw] relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={toggleLocationSelector}
                            style={{ fontSize: '2.5rem' }}  // Kích thước tùy chỉnh
                        >
                            &times;
                        </button>
                        <LocationSelector updateAddress={updateAddress} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewAddressForm;

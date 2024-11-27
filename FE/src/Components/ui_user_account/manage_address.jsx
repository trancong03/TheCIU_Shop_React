import React, { useEffect, useState } from "react";
import NewAddressForm from "./NewAddressForm";
import AddressCard from "../ui/AddressCard";
import { useCart } from "../context/CardContext";
const AddressList = () => {
    const { personID, address, updateAddress } = useCart();
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        setAddresses(address);
    }, [address, addresses]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editAddress, setEditAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    async function updateDeliveryAddress(personId, oldDeliveryAddress, newDeliveryAddress, recipientName, phoneNumber) {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/update-delivery-address/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    person_id: personId,
                    old_delivery_address: oldDeliveryAddress,
                    new_delivery_address: newDeliveryAddress,
                    recipient_name: recipientName,
                    phone_number: phoneNumber,
                }),
            });

            if (response.ok) {
                updateAddress(prevAddresses => {
                    return prevAddresses.map((address, index) => {
                        if (index === editIndex) {
                            return { 
                                ...address,
                                DeliveryAddress: newDeliveryAddress,
                                RecipientName: recipientName,
                                PhoneNumber: phoneNumber,
                            };
                        }
                        return address;
                    });
                });
                alert('Địa chỉ đã được cập nhật thành công!'); // Thông báo thành công
            } else {
                const error = await response.json();
                alert('Có lỗi xảy ra: ' + error.message); // Thông báo lỗi
                console.error('Error updating address:', error.message);
            }
        } catch (error) {
            alert('Có lỗi xảy ra: ' + error.message);
            console.error('Error updating address:', error);
        } finally {
            setIsLoading(false); // Kết thúc trạng thái loading
        }
    } 
    const handleDeleteAddress = async (index) => {
        const addressToDelete = addresses[index];
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?');
        if (!confirmDelete) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/delete-delivery-address/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ person_id: personID, delivery_address: addressToDelete.DeliveryAddress }),
            });

            if (response.ok) {
                updateAddress(prevAddresses => prevAddresses.filter((_, i) => i !== index));
                alert('Địa chỉ đã được xóa thành công!');
            } else {
                const error = await response.json();
                alert('Có lỗi xảy ra: ' + error.message);
            }
        } catch (error) {
            alert('Có lỗi xảy ra: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };



    async function addDeliveryAddress(personId, recipientName, phoneNumber, deliveryAddress) {
        const response = await fetch('/api/create-delivery-address/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person_id: personId,
                recipient_name: recipientName,
                phone_number: phoneNumber,
                delivery_address: deliveryAddress,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Address added successfully:', result);
            setAddresses(prevAddresses => [...prevAddresses, result.new_address]); // Giả sử server trả về địa chỉ mới
        } else {
            const error = await response.json();
            console.error('Error adding address:', error.message);
        }
    }

    const handleEditAddress = (index) => {
        setEditIndex(index);
        setEditAddress(addresses[index]);
        setShowForm(true);
    };

   

    return (
        <div className="mx-auto bg-white max-w-full min-h-screen p-4 flex-1 justify-between items-center">
            <h2 className="text-4xl font-bold mb-6">Sổ địa chỉ</h2>
            <div>
                {addresses.length === 0 ? (
                    <h1 className="text-gray-600 font-bold text-2xl">Chưa thêm địa chỉ</h1>
                ) : (
                    addresses.map((addr, index) => (
                        <AddressCard
                            key={index}
                            name={addr.RecipientName}
                            phone={addr.PhoneNumber}
                            address={addr.DeliveryAddress}
                            onEdit={() => handleEditAddress(index)}
                            onDelete={() => handleDeleteAddress(index)}
                        />
                    ))
                )}
            </div>
            <div className="w-full flex items-center justify-center ">
                <button
                    onClick={() => {
                        setEditIndex(null);
                        setEditAddress(null);
                        setShowForm(true);
                    }}
                    className="w-[40%] py-3 bg-gray-800 text-white text-lg rounded-md mt-4"
                >
                    <span className="mr-2">+</span> Thêm địa chỉ mới
                </button>

                {showForm && (
                    <NewAddressForm
                        onClose={() => setShowForm(false)}
                        address={editAddress} // Truyền địa chỉ cần chỉnh sửa
                        onSubmit={(newAddress) => {
                            if (editIndex !== null) {
                                updateDeliveryAddress(
                                    personID,
                                    editAddress.DeliveryAddress,
                                    newAddress.DeliveryAddress,
                                    newAddress.RecipientName,
                                    newAddress.PhoneNumber
                                );
                            } else {
                                addDeliveryAddress(
                                    personID,
                                    newAddress.RecipientName,
                                    newAddress.PhoneNumber,
                                    newAddress.DeliveryAddress
                                );
                            }
                            setShowForm(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AddressList;

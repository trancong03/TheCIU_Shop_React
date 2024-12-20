import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Nhập Link từ react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faShare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BellRing, BookMarked, Heart, Info, ListOrdered, LogOut, TimerReset, Wallet } from 'lucide-react';
import { FaCartPlus } from 'react-icons/fa';
export default function NavigationAccount({ user, setUserInfo }) {
    const [coverImage, setCoverImage] = useState(`image/${user.background || 'default-cover.jpg'}`); // Thay 'default-cover.jpg' bằng đường dẫn tới hình ảnh mặc định
    const [avatarImage, setAvatarImage] = useState(`image/${user.avatar || 'default-avatar.jpg'}`); // Thay 'default-avatar.jpg' bằng đường dẫn tới hình ảnh mặc định

    useEffect(() => {
        setCoverImage(`http://127.0.0.1:8000//media/images/${user.background || 'default-cover.jpg'}`);
        setAvatarImage(`http://127.0.0.1:8000//media/images/${user.avatar || 'default-avatar.jpg'}`);
    }, [user]);

    const handleImageChange = async (file, type) => {
        if (!file) return;

        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_FILE_SIZE) {
            alert('File size exceeds the maximum limit (5MB).');
            return;
        }
        const formData = new FormData();
        if (type === 'avatar') {
            formData.append('avatar', file.name);
        } else {
            formData.append('background', file.name);
        }
        formData.append('username', user.username);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/update-images/', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                alert(`${type === 'background' ? 'Cover' : 'Avatar'} updated successfully`);
                if (type === 'background') {
                    setCoverImage(URL.createObjectURL(file)); 
                } else {
                    setAvatarImage(URL.createObjectURL(file)); 
                }
                window.location.reload();
            } else {
                alert(`Error updating ${type}: ` + result.error);
            }
        } catch (error) {
            alert('Error: ' + error);
        }
    };


    const handleCoverChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageChange(file, 'background');
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageChange(file, 'avatar');
        }
    };


    return (
        <div className='w-[30vw]  min-h-screen'>
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md p-4 text-md">
                <div className="relative">
                    <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverChange}
                            id="cover-upload"
                            className="hidden"
                        />
                        <label htmlFor="cover-upload" className="border rounded p-1 bg-white cursor-pointer opacity-70">
                            <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
                        </label>
                    </div>
                    <div className="absolute -bottom-8 left-4">
                        <img
                            src={avatarImage}
                            alt="User"
                            className="w-16 h-16 rounded-full border-4 border-white"
                        />
                        <div className="absolute bottom-0 right-0">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                id="avatar-upload"
                                className="hidden"
                            />
                            <label htmlFor="avatar-upload" className="border rounded p-1 bg-white cursor-pointer opacity-70">
                                <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
                            </label>
                        </div>
                    </div>
                </div>
                <br />
                <div className="mt-3 pl-4 shadow-sm p-4">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    
                    <p className="text-gray-600 mt-2 text-md">
                        <FontAwesomeIcon icon={faLocationDot} className='mr-3' /> {user.address}
                    </p>
                    <p className=" text-gray-600 mt-2 text-md">
                        <FontAwesomeIcon icon={faEnvelope}  className='mr-3'/>  {user.email}
                    </p>
                    <br />
                    <hr />
                </div>
               
                <ul className='space-y-4 text-lg shadow-sm'>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <Info />
                        <a href="/account" className="block p-2 rounded">Thông tin tài khoản</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200 ' >
                        <ListOrdered />
                        <a href="/account/user-post" className="block p-2 rounded">Thông báo - Ưu Đãi</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <FaCartPlus />
                        <a href="/account/cart" className="block p-2 rounded">Sản phẩm trong giỏ hàng</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <Heart />
                        <a href="/account/like-product" className="block p-2 rounded">Sản phẩm yêu thích</a></li>

                    {/* <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <BookMarked />
                        <a href="/account/manage-address" className="block p-2 rounded">Quản lý địa chỉ</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <Wallet />
                        <a href="/vouchers" className="block p-2 rounded">Ví voucher</a></li> */}
                    <li className='flex justify-start ml-3 h-full items-center  hover:bg-gray-200'>
                        <TimerReset />
                        <a href="/account/reset-password" className="block p-2 rounded">
                            Thay đổi mật khẩu</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <LogOut />
                        <a href="/logout" className="block p-2 rounded">Đăng xuất</a></li>

                </ul>
            </div>
        </div>
    );
}

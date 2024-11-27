import React, { useState, useEffect } from 'react';
import { BellRing, BookMarked, Heart, Info, ListOrdered, LogOut, TimerReset, Wallet } from 'lucide-react';
import { FaCartPlus } from 'react-icons/fa';

export default function NavigationAccount({ user, setUserInfo }) {
    const [avatarImage, setAvatarImage] = useState(`image/${user.avatar || 'default-avatar.jpg'}`); // Thay 'default-avatar.jpg' bằng đường dẫn tới hình ảnh mặc định

    useEffect(() => {
        setAvatarImage(`/image/${user.avatar || 'cong.jpg'}`);
    }, [user]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result);
            };
            setAvatarFile(file); 
            reader.readAsDataURL(file);
        }
    };

    
    return (
       <>
            
            <div className="w-1/5 p-4 bg-white shadow-md min-h-screen">
                <div className="flex items-center mb-4">
                    <img
                        src={avatarImage}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full border-4 border-white"
                    />
                    <span className="font-bold text-lg">{user.name}</span>
                </div>
                <ul className='space-y-4 text-lg'>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <Info />
                        <a href="/account" className="block p-2 rounded">Thông tin tài khoản</a></li>                    
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200 ' >
                        <ListOrdered/>
                        <a href="/orders" className="block p-2 rounded">Quản lý đơn hàng</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <FaCartPlus/>
                        <a href="/account/cart" className="block p-2 rounded">Sản phẩm trong giỏ hàng</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <Heart/>
                        <a href="/account/like-product" className="block p-2 rounded">Sản phẩm yêu thích</a></li>

                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <BookMarked />
                        <a href="/account/manage-address" className="block p-2 rounded">Quản lý địa chỉ</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <Wallet/>
                        <a href="/vouchers" className="block p-2 rounded">Ví voucher</a></li>
                   <li className='flex justify-start ml-3 h-full items-center  hover:bg-gray-200'>
                        <TimerReset />
                        <a href="/account/reset-password" className="block p-2 rounded">
                            Thay đổi mật khẩu</a></li>
                    <li className='flex justify-start ml-3 items-center  hover:bg-gray-200'>
                        <LogOut />
                        <a href="/logout" className="block p-2 rounded">Đăng xuất</a></li>

                </ul>
            </div>
       </>
    );
}

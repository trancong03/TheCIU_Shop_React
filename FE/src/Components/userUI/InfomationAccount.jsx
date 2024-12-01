import React, { useEffect, useState } from 'react'
import LocationSelector from '../ui/LocationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
export default function InfomationAccount({ user, setUserInfo }) {
    console.log(user);
    const [name, setname] = useState(user.name);
    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
        }
    }, []);
    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const toggleLocationSelector = () => {
        setShowLocationSelector(!showLocationSelector);
    };
    const updateaddress = (address) => {
        setUserInfo({
            ...user,
            address: address
        });
        toggleLocationSelector();
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return ""; // Nếu không có giá trị, trả về chuỗi rỗng
        const [day, month, year] = dateString.split("/"); // Tách ngày, tháng, năm từ định dạng DD/MM/YYYY
        return `${year}-${month}-${day}`; // Trả về định dạng YYYY-MM-DD
    };
    const saveUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user.manguoidung}/`, {
                method: 'PUT',  // Thay bằng 'PATCH' nếu chỉ cập nhật một số trường
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    gender: user.gender,
                    birthday: user.birthday,
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const result = await response.json();
            localStorage.setItem('userInfo', JSON.stringify(result));
            setUserInfo({...user, name: name })
            alert('Thông tin đã được cập nhật!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin!');
        }
    };
    
  return (
      <div className='h-auto w-[60vw] mt-8'>
         
          <h2 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h2>
          <div>
              <div className='flex items-center justify-center gap-4'>
                  <div className="mb-4 p-3 w-[30vw]  border border-gray-300 rounded-md text-lg">
                      <label className="block text-sm text-slate-400  font-bold" htmlFor="name">
                          Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={name || ""}
                          onChange={(e) =>setname(e.target.value )}
                          className="w-full focus:outline-none text-slate-400  font-bold"
                      />
                  </div>
                  <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg text-slate-400  font-bold">
                      <label className="block text-sm font-medium mb-1" htmlFor="nickname">
                          Số điện thoại :
                      </label>
                      <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={user.phone || ""}
                          onChange={(e) => setUserInfo({ ...user, phone: e.target.value })}
                          className="w-full focus:outline-none text-slate-400  font-bold"
                      />
                  </div>

              </div>
              <div>
                  <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg text-slate-400  font-bold">
                      <label className="block text-sm font-medium mb-1" htmlFor="nickname">
                          Email :
                      </label>
                      <input
                          type="text"
                          id="nickname"
                          name="nickname"
                          value={user.email || ""}
                          onChange={(e) => setUserInfo({ ...user, email: e.target.value })}
                          className="w-full focus:outline-none text-slate-400  font-bold "
                      />
                  </div>
              </div>
              <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg ">
                  <label className="block text-sm text-slate-400  font-bold">
                      Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <div className='flex text-slate-500'>
                      <input
                          type="text"
                          id="address"
                          name="address"
                          value={user.address || ""}
                          onChange={(e) => setUserInfo({ ...user, address: e.target.value })}
                          onClick={toggleLocationSelector}
                          className="w-full focus:outline-none "
                      />
                      <FontAwesomeIcon icon={faPlay} />
                  </div>
              </div>

          </div>
         
          <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="relative">
                  <select
                      className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={user.gender || ""}
                      onChange={(e) => {
                          if (user) {
                              setUserInfo({ ...user, gender: e.target.value });
                          }
                      }}
                  >
                      <option value="" disabled>Giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="LGBT">Khác</option>
                  </select>

                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>

                  </div>
              </div>

              <div className="relative">
                  <input type="date"
                      value={user.birthday} 
                      onChange={(e) => setUserInfo({ ...user, birthday: e.target.value })} 
                      placeholder="DD/MM/YYYY"
                      className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
          </div>
          <div className="relative mt-3">
              
              <button onClick={saveUserInfo} className="w-[15vw] mb-3 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                  Thay đổi thông tin
              </button>
              <p className=" block text-xs text-gray-500 mt-1">
                  Tên  sau khi được cập nhật sẽ không thể thay đổi trong vòng 60 ngày tới.
              </p>
         

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
                      <LocationSelector updateaddress={updateaddress} /> {/* Hiển thị component LocationSelector */}
                  </div>
              </div>
          )}
          <br />
          <br />
      </div>

  )
}

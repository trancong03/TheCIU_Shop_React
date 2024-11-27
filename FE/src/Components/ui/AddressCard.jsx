import React from 'react'
import {  FaPencilAlt } from "react-icons/fa";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddressCard({ name, phone, address, onEdit, onDelete }) {
  return (
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md mb-4 gap-4 max-w-2xl">
          <div className='flex-1 space-x-3 space-y-3 '>
              <div className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faLocationDot}/>
                  <p className="text-md font-bold">{name}</p>
            </div>
              <div className='flex items-center gap-1'>
                  <p className="text-sm">Số điện thoại: </p>
                  <p className="text-md font-bold">{phone}</p>
              </div>
              <div className='flex items-center gap-1'>
                  <p className="text-sm">Địa chỉ: </p>
                  <p className="text-md font-bold">{address}</p>
              </div>
          </div>
          <div className="flex gap-4">
              <button onClick={onEdit} className="text-gray-600 hover:text-blue-600">
                  <FaPencilAlt/>
              </button>
              <button onClick={onDelete} className="text-gray-600 hover:text-red-600">
                  <span>X</span>
              </button>
          </div>
      </div>
  )
}

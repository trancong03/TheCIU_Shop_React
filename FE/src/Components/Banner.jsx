import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
export default function Banner({ products }) {
  return (
    <div>
      <div className='h-[100vh] w-[100vw]'  >
        <Swiper pagination={true} modules={[Pagination, Autoplay]} className="mySwiper h-full w-full"
         autoplay={{
          delay: 3000, // Thay đổi thời gian trễ giữa các slide (3000ms = 3 giây)
          disableOnInteraction: false, // Cho phép tự động chạy sau khi người dùng tương tác
        }}>
          <SwiperSlide><img src="image/product/slide1.webp" className='w-full h-[80vh] object-contain' alt="" /></SwiperSlide>
          <SwiperSlide><img src="image/product/slide3.webp" className='w-full h-[80vh] object-contain' alt="" /></SwiperSlide>
          <SwiperSlide><img src="image/product/slide2.webp" className='w-full h-[80vh] object-contain' alt="" /></SwiperSlide>
        </Swiper>
      </div>
      <h1 className="text-3xl font-bold text-center mt-[3rem] mb-[3rem]">Sản phẩm nổi bật</h1>

          <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                  clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
          >
        {products.map((product, productIndex) => (
          <SwiperSlide key={productIndex}>
            <img
              src={`/image/product/${product.ImageID[0]}`} // Sử dụng ảnh đầu tiên trong mảng ImageID
              alt={product.Name}
              className='w-[15rem] h-[20rem]'
            />
          </SwiperSlide>
        ))}
          </Swiper>
    </div>
  )
}

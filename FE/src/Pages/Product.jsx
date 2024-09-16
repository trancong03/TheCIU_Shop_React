import React, { useState, useEffect } from 'react';
import CartItem from '../Components/ui/cartItem';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('Tất cả');
    const [sortType, setSortType] = useState('Giá thấp nhất');

    useEffect(() => {
        fetch('/src/data.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            });
    }, []);

    useEffect(() => {
        let updatedProducts = [...products];
        if (category !== 'Tất cả') {
            updatedProducts = products.filter((product) => product.category === category);
        }
        switch (sortType) {
            case 'Giá thấp nhất':
                updatedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Giảm giá nhiều nhất':
                updatedProducts.sort((a, b) => b.discount - a.discount);
                break;
            case 'Mới nhất':
                updatedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'Bán chạy nhất':
                updatedProducts.sort((a, b) => b.sales - a.sales);
                break;
            default:
                break;
        }
        setFilteredProducts(updatedProducts);
    }, [category, sortType, products]);

    const categories = ['Tất cả', 'Áo', 'Áo khoác', 'Bộ', 'Chân váy', 'Đầm', 'Phụ kiện', 'Quần', 'Yếm'];
    const sortOptions = ['Giá thấp nhất', 'Giảm giá nhiều nhất', 'Mới nhất', 'Bán chạy nhất'];

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <nav className="flex justify-center space-x-4 border-b">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className={`py-2 px-4 ${
                                category === cat ? 'border-b-2 border-black font-bold' : 'text-gray-500'
                            }`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <span className="mr-2">Sắp xếp theo</span>
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="border px-1 py-1 rounded-lg "
                    >
                        {sortOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <CartItem
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        images={product.images || []}
                    />
                ))}
            </div>
        </div>
    );
}

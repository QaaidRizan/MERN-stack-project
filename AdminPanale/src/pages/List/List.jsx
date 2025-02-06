import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './List.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function List() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', image: '' });
    const [imagePreview, setImagePreview] = useState(null);

    const fetchProducts = async () => {
        try {
            let url = 'http://localhost:3000/api/products';
            if (searchTerm) {
                url += `?name=${encodeURIComponent(searchTerm)}`;
            }
            const response = await axios.get(url);

            if (response.data && response.data.products && Array.isArray(response.data.products)) {
                setProducts(response.data.products.map(product => ({
                    id: product._id || product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    image: product.image, // Store just the filename
                })));
            } else {
                console.warn('API response is not in the expected format:', response.data);
                setProducts([]);
                toast.error(response.data?.message || 'Invalid response from API');
            }
        } catch (error) {
            toast.error(`Error fetching data: ${error.message}`);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const RemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            toast.success('Item removed successfully!');
            fetchProducts();
        } catch (error) {
            toast.error(`Error removing item: ${error.message}`);
        }
    };

    const UpdateItem = (item) => {
        setEditingItem(item.id);
        setFormData({ name: item.name, category: item.category, price: item.price, image: item.image });
        setImagePreview(`http://localhost:3000/uploads/${item.image}`);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'image') {
            const file = e.target.files[0];
            if (file) {
                setImagePreview(URL.createObjectURL(file));
            }
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('image', formData.image);

            await axios.put(`http://localhost:3000/api/products/${editingItem}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Item updated successfully!');
            fetchProducts();
            setEditingItem(null);
            setImagePreview(null);
        } catch (error) {
            toast.error(`Error updating item: ${error.message}`);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        fetchProducts();
    }, [searchTerm]);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="list-add-flex-col">
            <ToastContainer />
            <h1>All Foods List</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b> <b>Name</b> <b>Category</b> <b>Price</b> <b>Action</b>
                </div>
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item.id} className="list-table-format">
                            <img
                                src={`http://localhost:3000/uploads/${item.image}`}
                                alt={item.name}
                                className="product-image"
                            />
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</p> {/* Added non-breaking space */}
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.category}</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.price}</p>
                            <div className="action-buttons">
                                <button onClick={() => RemoveItem(item.id)}>Delete</button>
                                <button onClick={() => UpdateItem(item)}>Update</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No products found.</div>
                )}
            </div>

            {editingItem && (
                <div className="update-form">
                    <h3>Update Food Item</h3>
                    <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Image:</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFormChange}
                                accept="image/*"
                            />
                        </div>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                        )}
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
}

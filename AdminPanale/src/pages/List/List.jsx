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
    const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '' });
    const [images, setImages] = useState([null, null, null, null, null]);
    const [imagePreview, setImagePreview] = useState(null);

    const API_BASE_URL = 'https://server2-production-1aab.up.railway.app/api/products';

    const fetchProducts = async () => {
        try {
            let url = API_BASE_URL;
            if (searchTerm) {
                url += `?name=${encodeURIComponent(searchTerm)}`;
            }
            const response = await axios.get(url);

            // Check if the response has the success property and products array
            if (response.data && response.data.success && Array.isArray(response.data.products)) {
                setProducts(response.data.products.map(product => ({
                    id: product.id, // Already formatted as id in your API
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    // Get the first image from the images array
                    image: product.images && product.images.length > 0 ? product.images[0] : null,
                    // Store all images
                    images: product.images || []
                })));
            } else {
                console.warn('API response is not in the expected format:', response.data);
                setProducts([]);
                toast.error('Invalid response from API');
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
            await axios.delete(`${API_BASE_URL}/${id}`);
            toast.success('Item removed successfully!');
            fetchProducts();
        } catch (error) {
            toast.error(`Error removing item: ${error.message}`);
        }
    };

    const UpdateItem = (item) => {
        setEditingItem(item.id);
        setFormData({ 
            name: item.name, 
            category: item.category, 
            price: item.price,
            description: item.description
        });
        
        // If the item has images, set the preview to the first one
        if (item.images && item.images.length > 0) {
            setImagePreview(item.images[0]);
        }
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
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            
            // Append only non-null images
            images.forEach((image, index) => {
                if (image instanceof File) {
                    formDataToSend.append(`image${index + 1}`, image);
                }
            });

            await axios.put(`${API_BASE_URL}/${editingItem}`, formDataToSend, {
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
            <h1>All Vehicle Parts</h1>
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
                                src={item.image} // This will now be image1 from MongoDB
                                alt={item.name}
                                className="product-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                }}
                            />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${parseFloat(item.price).toFixed(2)}</p>
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
                    <h3>Update Product</h3>
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
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="Car">Car</option>
                                <option value="Bike">Bike</option>
                                <option value="Boat">Boat</option>
                            </select>
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleFormChange}
                                required
                                min="0"
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

import React, { useState, useCallback } from "react";
import "./Add.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../../assets/assets";

export default function Add() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Car", // Default category
    });
    const [loading, setLoading] = useState(false);

    const onChangeHandler = useCallback((event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file); // Store the file directly for upload
        } else {
            toast.error("Please upload a valid image file.");
            setImage(null);
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!data.name || !data.description || !data.price || !data.category || !image) {
            toast.error("All fields (name, price, image, description, category) are required.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price);
        formData.append("image", image); // Use the file directly

        try {
            const response = await fetch("https://server2-production-1aab.up.railway.app/api/products", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Product added successfully!");
                setData({ name: "", description: "", category: "Car", price: "" });
                setImage(null);
            } else {
                const errorData = await response.json();
                toast.error(`Failed to add product: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            toast.error(`Error adding product: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="paper">
                <h2><u><center>Add Product</center></u></h2>
                <form onSubmit={onSubmitHandler} className="form">
                    <div className="form-group">
                        <label>Upload Image</label>
                        <div className="upload-area">
                            <label htmlFor="image">
                                <img
                                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                                    alt="Upload Area"
                                    className="upload-img"
                                />
                            </label>
                            <input
                                type="file"
                                id="image"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Part Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={onChangeHandler}
                            rows="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Vehicle Category</label>
                        <select
                            name="category"
                            value={data.category}
                            onChange={onChangeHandler}
                            required
                        >
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                            <option value="Boat">Boat</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Part Price</label>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={onChangeHandler}
                            required
                            min="0"
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
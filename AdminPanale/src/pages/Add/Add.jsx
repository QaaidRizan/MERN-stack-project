import React, { useState, useCallback } from "react";
import "./Add.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../../assets/assets";

export default function Add() {
    const [images, setImages] = useState([null, null, null, null, null]); // Array for 5 images
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

    const handleImageChange = (index) => (event) => {
        const file = event.target.files[0];
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            if (file && file.type.startsWith("image/")) {
                updatedImages[index] = file; // Update the specific image
            } else {
                toast.error("Please upload a valid image file.");
                updatedImages[index] = null;
            }
            return updatedImages;
        });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!data.name || !data.description || !data.price || !data.category || !images.some((img) => img)) {
            toast.error("All fields (name, price, description, category) are required, and at least one image must be uploaded.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price);
        images.forEach((image, index) => {
            if (image) {
                formData.append(`image${index + 1}`, image); // Append only non-null images
            }
        });

        try {
            const response = await fetch("https://54.255.10.62:3000/api/products/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Product added successfully!");
                setData({ name: "", description: "", category: "Car", price: "" });
                setImages([null, null, null, null, null]);
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
                        <label>Upload Images (At least one required)</label>
                        <div className="upload-area">
                            {images.map((image, index) => (
                                <div key={index} className="image-upload-box">
                                    <label htmlFor={`image${index}`}>
                                        <img
                                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                                            alt={`Upload Area ${index + 1}`}
                                            className="upload-img"
                                        />
                                    </label>
                                    <input
                                        type="file"
                                        id={`image${index}`}
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange(index)}
                                    />
                                </div>
                            ))}
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
import React, { useState } from "react";

// Dummy Data for Initial Carts
const initialCarts = [
    { id: 1, name: "Car Battery", price: 100, quantity: 2, photo: "" },
    { id: 2, name: "Brake Pads", price: 50, quantity: 3, photo: "" },
    { id: 3, name: "Tires", price: 200, quantity: 4, photo: "" },
    { id: 4, name: "Car Battery", price: 150, quantity: 1, photo: "" },
    { id: 5, name: "Brake Pads", price: 75, quantity: 2, photo: "" },
];

const SellerPage = () => {
    const [carts, setCarts] = useState(initialCarts);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [item, setItem] = useState({ name: "", price: "", quantity: "", photo: "" });
    const [searchCategory, setSearchCategory] = useState("");

    // Handle opening add new item form
    const openForm = () => {
        setItem({ name: "", price: "", quantity: "", photo: "" });
        setShowForm(true);
    };

    // Handle adding new item
    const handleAddItem = (e) => {
        e.preventDefault();
        const newItem = { ...item, id: carts.length + 1 };
        setCarts([...carts, newItem]);
        setShowForm(false);
    };

    // Handle item changes for add/edit forms
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    // Handle photo upload
    const handlePhotoUpload = (e) => {
        const photo = URL.createObjectURL(e.target.files[0]);
        setItem((prevItem) => ({ ...prevItem, photo }));
    };

    // Handle deletion confirmation popup
    const handleDelete = (id) => {
        setCurrentItem(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setCarts(carts.filter((cart) => cart.id !== currentItem));
        setShowDeleteConfirm(false);
    };

    // Handle edit form popup
    const handleEdit = (cart) => {
        setItem(cart);
        setShowEditForm(true);
    };

    // Handle update form submission
    const handleUpdateItem = (e) => {
        e.preventDefault();
        setCarts(
            carts.map((cart) => (cart.id === item.id ? { ...cart, ...item } : cart))
        );
        setShowEditForm(false);
    };

    // Filter items based on search category
    const filteredCarts = searchCategory
        ? carts.filter((cart) => cart.name === searchCategory)
        : carts;

    return (
        <div className="p-8">
            {/* Search Bar with Dropdown */}
            <div className="mb-2"> {/* Decreased margin for title and search bar */}
                <label className="mr-4 text-gray-700">Search by Category:</label>
                <select className="px-4 py-2 border border-gray-300 rounded-md" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="Car Battery">Car Battery</option>
                    <option value="Brake Pads">Brake Pads</option>
                    <option value="Tires">Tires</option>
                </select>
            </div>

            {/* Display Cart Items with Scroll */}
            <div className="overflow-y-auto max-h-80 w-full max-w-xl mx-auto">
                {filteredCarts.map((cart, index) => (
                    <div key={cart.id} className="mb-2 p-3 border border-gray-200 rounded-lg"> {/* Reduced padding and margin */}
                        <img src={cart.photo} alt="Item" className="w-24  mb-2" /> {/* Reduced image size */}
                        <h3 className="text-lg font-medium">{cart.name}</h3>
                        <p>Price: ${cart.price}</p>
                        <p>Quantity: {cart.quantity}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => handleEdit(cart)}
                                className="mr-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(cart.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Item Button */}
            <button onClick={openForm} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto"> {/* Centered button with block and mx-auto */}
                Add New Item
            </button>

            {/* Add Item Form */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                        <form onSubmit={handleAddItem}>
                            {/* Dropdown for Item Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Item Name</label>
                                <select
                                    name="name"
                                    value={item.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Item</option>
                                    <option value="Car Battery">Car Battery</option>
                                    <option value="Brake Pads">Brake Pads</option>
                                    <option value="Tires">Tires</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={item.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Quantity */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Photo Upload */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Upload Item Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Item Form */}
            {showEditForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Update Item</h2>
                        <form onSubmit={handleUpdateItem}>
                            {/* Dropdown for Item Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Item Name</label>
                                <select
                                    name="name"
                                    value={item.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Item</option>
                                    <option value="Car Battery">Car Battery</option>
                                    <option value="Brake Pads">Brake Pads</option>
                                    <option value="Tires">Tires</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={item.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Quantity */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Photo Upload */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Upload Item Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowEditForm(false)}
                                    className="mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Update Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4 text-center">Confirm Delete</h2>
                        <p className="text-center mb-6">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerPage;


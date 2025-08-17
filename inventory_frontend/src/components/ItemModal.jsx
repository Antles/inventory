import React, { useState, useEffect } from 'react';

// This component is a modal dialog for adding a new item or editing an existing one.
const ItemModal = ({ item, onClose, onSave }) => {
    // The 'item' prop will be null for a new item, or an object for an item being edited.
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // useEffect hook to populate the form fields when the 'item' prop changes (i.e., when opening the modal to edit)
    useEffect(() => {
        if (item) {
            setName(item.name);
            setSku(item.sku);
            setQuantity(item.quantity);
            setDescription(item.description);
        } else {
            // Reset form for adding a new item
            setName('');
            setSku('');
            setQuantity(0);
            setDescription('');
        }
    }, [item]);

    const handleSave = async () => {
        setIsLoading(true);
        const itemData = {
            id: item ? item.id : undefined, // Include id if we are editing
            name,
            sku,
            quantity: Number(quantity),
            description
        };
        await onSave(itemData);
        setIsLoading(false);
        onClose(); // Close the modal after saving
    };

    return (
        // This is the modal backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">{item ? 'Edit Item' : 'Add New Item'}</h3>
                <div className="space-y-4">
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="SKU" value={sku} onChange={e => setSku(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-2 border rounded" required />
                    <textarea placeholder="Description (Optional)" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSave} disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300">
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;

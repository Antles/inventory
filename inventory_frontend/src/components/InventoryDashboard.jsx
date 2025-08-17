import React, { useState, useEffect, useCallback } from 'react';
import apiRequest from '../Api';
import ItemModal from './ItemModal';
import AlertModal from './AlertModal'; // Import the new modal

const InventoryDashboard = ({ setIsLoggedIn }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // State for controlling the confirmation modal
    const [confirmInfo, setConfirmInfo] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            let endpoint = '/items/search';
            const params = new URLSearchParams();
            if (searchTerm) {
                params.append('q', searchTerm);
            }

            if (params.toString()) {
                endpoint += `?${params.toString()}`;
            } else {
                endpoint = '/items';
            }

            const data = await apiRequest(endpoint);
            setItems(data || []);
        } catch (err) {
            setError('Failed to fetch inventory items.');
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchItems();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchItems]);

    const handleSaveItem = async (itemData) => {
        try {
            if (itemData.id) {
                await apiRequest(`/items/${itemData.id}`, 'PUT', itemData);
            } else {
                await apiRequest('/items', 'POST', itemData);
            }
            fetchItems();
        } catch (err) {
            setError('Failed to save item.');
        }
    };

    const confirmDeleteItem = (itemId) => {
        setConfirmInfo({
            isOpen: true,
            title: 'Delete Item',
            message: 'Are you sure you want to permanently delete this item?',
            confirmText: 'Delete',
            onConfirm: () => handleDeleteItem(itemId)
        });
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await apiRequest(`/items/${itemId}`, 'DELETE');
            fetchItems();
        } catch (err) {
            setError('Failed to delete item.');
        }
    };

    const openModalToAdd = () => {
        setEditingItem(null);
        setIsItemModalOpen(true);
    };

    const openModalToEdit = (item) => {
        setEditingItem(item);
        setIsItemModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center text-2xl font-bold text-indigo-600">
                            StockTrack
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => setIsLoggedIn(false)} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <div className="relative w-full sm:max-w-xs">
                            <input
                                type="text"
                                placeholder="Search by name or SKU..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full p-2 pl-10 border rounded-md"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <button onClick={openModalToAdd} className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add New Item
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {isLoading ? (
                                <li className="p-4 text-center text-gray-500">Loading inventory...</li>
                            ) : items.length > 0 ? (
                                items.map(item => (
                                    <li key={item.id} className="p-4 hover:bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-indigo-600 truncate">{item.name}</p>
                                                <p className="text-sm text-gray-500 truncate">SKU: {item.sku}</p>
                                            </div>
                                            <div className="hidden sm:block mx-4 text-center">
                                                <p className="text-sm text-gray-900">{item.quantity}</p>
                                                <p className="text-xs text-gray-500">Quantity</p>
                                            </div>
                                            <div className="flex-shrink-0 flex items-center space-x-2">
                                                <button onClick={() => openModalToEdit(item)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                <button onClick={() => confirmDeleteItem(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="p-4 text-center text-gray-500">No inventory items found.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </main>

            {isItemModalOpen && <ItemModal item={editingItem} onClose={() => setIsItemModalOpen(false)} onSave={handleSaveItem} />}
            <AlertModal
                isOpen={confirmInfo.isOpen}
                onClose={() => setConfirmInfo({ isOpen: false, title: '', message: '', onConfirm: null })}
                title={confirmInfo.title}
                message={confirmInfo.message}
                onConfirm={confirmInfo.onConfirm}
                confirmText={confirmInfo.confirmText}
            />
        </div>
    );
};

export default InventoryDashboard;

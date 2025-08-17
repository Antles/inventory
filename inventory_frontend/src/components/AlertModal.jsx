import React from 'react';

// This is a reusable modal for alerts and confirmations.
const AlertModal = ({ isOpen, onClose, title, message, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
    if (!isOpen) {
        return null;
    }

    return (
        // Modal backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    {/* If onConfirm is provided, it's a confirmation dialog with two buttons */}
                    {onConfirm ? (
                        <>
                            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                {confirmText}
                            </button>
                        </>
                    ) : (
                        // Otherwise, it's a simple alert with one button
                        <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertModal;

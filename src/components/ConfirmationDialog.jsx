import Modal from "./Modal";

const ConfirmationDialog = (
    { 
        isOpen,
        onClose,
        title = "Confirm Action",
        message = "Are you sure you want to perform this action?",
        confirmText = "Confirm",
        cancelText = "Cancel",
        onConfirm,
        confirmationButtonClass = "bg-red-600 hover:bg-red-700",
    
    }) => {

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    const actions = (
        <>
            <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
                {cancelText}
            </button>
            <button
                onClick={handleConfirm}
                className={`px-4 py-2 text-white rounded-lg transition ${confirmationButtonClass}`}
            >
                {confirmText}
            </button>
        </>
    );
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            actions={actions}
            size="sm"
        >
            <p className="text-gray-600">{message}</p>
        </Modal>
    );
};

export default ConfirmationDialog;
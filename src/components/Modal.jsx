const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children,
    actions,
    size = "md",
    closeOnBackdropClick = true 
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: "w-80",
        md: "w-96",
        lg: "w-full max-w-2xl",
        xl: "w-full max-w-4xl"
    };

    const handleBackdropClick = () => {
        if (closeOnBackdropClick) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            {/* Backdrop */}
            <div 
                className="fixed inset-0" 
                onClick={handleBackdropClick}
            />

            {/* Modal Box */}
            <div className={`bg-white rounded-lg shadow-lg z-50 ${sizeClasses[size]} relative`}>
                {/* Header */}
                {title && (
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>

                {/* Actions */}
                {actions && (
                    <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;

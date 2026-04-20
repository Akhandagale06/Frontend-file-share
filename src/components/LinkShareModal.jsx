import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Check, Copy } from "lucide-react";

const LinkShareModal = ({
    isOpen,
    onClose,
    link,
    title = "Share File Link",
}) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setCopied(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!copied) return;

        const timeout = window.setTimeout(() => {
            setCopied(false);
        }, 2000);

        return () => window.clearTimeout(timeout);
    }, [copied]);

    const handleCopyLink = async () => {
        if (!link) return;

        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
        } catch (error) {
            console.error("Copy failed", error);
            setCopied(false);
        }
    };

    const actions = (
        <>
            <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
                Close
            </button>
            <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${copied ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy Link"}
            </button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} actions={actions} size="sm">
            <div className="space-y-4">
                <p className="text-gray-600">Use the link below to share this file.</p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 break-all">
                    {link || "No share link available."}
                </div>
            </div>
        </Modal>
    );
};

export default LinkShareModal;

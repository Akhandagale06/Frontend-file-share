const FooterSection = () => {
    return (
        <footer className="bg-white-100 text-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                
                <div className="mt-10 border-t justify-center items-center border-gray-200 pt-8 text-sm text-gray-500 flex">
                    <p className="text-center">
                        © {new Date().getFullYear()} FileShare. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
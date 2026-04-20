import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ openSignIn, openSignUp }) => {
    return (
        <div className="landing-page-content relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-50 to-indigo-50 opacity-80 z-0 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">

                    <div className="text-center">
                        <h1 className="text-7xl tracking-tight font-extrabold text-gray-900 sm:text-5xl lg:text-5xl">
                            <span className="block">Secure File Sharing with </span>
                            <span className="block text-purple-500">File Share</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Collaborate faster with secure, real-time file sharing.
                        </p>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <button
                                    onClick={() => openSignUp()}
                                    className="bg-purple-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Get started
                                </button>
                                <button
                                    onClick={() => openSignIn()}
                                    className="bg-white border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    Sign-in
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="relative ">

                    <div className="flex justify-center items-center mx-auto">
                        <div className="w-64 sm:w-72 md:w-96 mt-1">
                            <video
                                src="/ff.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>


                    {/* <div className="absolute inset-0 bg-linear-to-t from-black opacity-10 rounded-lg">

                    </div> */}
                </div>

                <div className="mt-5 text-center mb-2 ">
                    <p className="mt-4 text-base text-gray-500 mb-8">
                        Enterprise-grade encryption keeps your files safe, while secure links give you complete control over access.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
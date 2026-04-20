const CTASection = ({openSignUp}) => {
  return (
    <section className="py-20 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-lg sm:p-12">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-200">Start sharing smarter</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                Sign up today and simplify your file workflow.
              </h2>
              <p className="mt-4 text-base text-purple-100 sm:text-lg">
                Join now to get secure file storage, easy sharing, and fast access across your devices.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-end">
             <button 
             onClick={() => openSignUp()}
             className="inline-flex w-full items-center cursor-pointer justify-center rounded-full hover:scale-105 transition-normal bg-white px-8 py-3 text-base font-semibold text-indigo-600 shadow-lg transition hover:bg-gray-100 sm:w-auto">
              Sign-up

             </button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
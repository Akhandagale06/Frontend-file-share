const PricingSection = ({ pricingPlans, openSignUp }) => {
    return(
       <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
                <p className="mt-4 text-lg text-gray-500">Choose the plan that fits your needs. </p>
            </div>

            <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 ">
                {pricingPlans.map((plan, index) => (
                    <div key={index} className={`relative hover:scale-105 transition-all duration-300 ease-in-out p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg flex flex-col ${plan.popular ? ' border-2 border-purple-500 transform scale-105 ' : '  border border-gray-200 hover:border-gray-300'}`}>
                        {plan.popular && (
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                <span className="inline-flex rounded-full bg-purple-500 px-4 py-1 text-sm font-semibold text-white">
                                    Most popular
                                </span>
                            </div>
                        )}
                        <div className="flex-1 ">
                            <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                            <p className="mt-4 flex items-baseline text-gray-900">
                                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                                <span className="ml-1 text-xl font-semibold">{plan.period}</span>
                            </p>
                            <ul role="list" className="mt-6 space-y-6">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex">
                                        <span className="text-green-500">✓</span>
                                        <span className="ml-3 text-sm text-gray-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={()=>openSignUp()} className={`mt-8 block w-full cursor-pointer py-3 px-6 border border-transparent rounded-md text-center font-bold transition-colors duration-200 ${plan.popular ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-gray-100 text-purple-600 hover:bg-gray-200'}`}>
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>

        </div>

       </div>
    )
}

export default PricingSection;
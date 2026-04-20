const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What our users are saying
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
            Real stories from people who trust our file sharing and storage platform.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-lg leading-8 text-gray-700">“{testimonial.quote}”</p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="text-base font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <span key={starIndex} className={starIndex < testimonial.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
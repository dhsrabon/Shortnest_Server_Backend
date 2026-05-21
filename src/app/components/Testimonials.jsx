const Testimonials = () => {
  const reviews = [
    { name: "Rahim Uddin", role: "Football Enthusiast", text: "SportNest made finding a turf for our weekend matches incredibly easy. Highly recommended platform!" },
    { name: "Sara Islam", role: "Amateur Swimmer", text: "I love how I can see real-time availability. Booking a swimming lane has never been this smooth." },
  ];

  return (
    <div className="py-16 bg-blue-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-6">"{review.text}"</p>
              <div>
                <h4 className="font-bold text-gray-900">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
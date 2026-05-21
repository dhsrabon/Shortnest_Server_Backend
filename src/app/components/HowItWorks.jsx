import { FiSearch, FiCalendar, FiPlayCircle } from "react-icons/fi";

const HowItWorks = () => {
  // প্রতিটি স্টেপের জন্য আলাদা কালার থিম সেট করা হয়েছে
  const steps = [
    { 
      icon: <FiSearch className="text-4xl text-blue-600" />, 
      title: "Find Facility", 
      desc: "Search for your preferred sports facility near your location.",
      stepNum: "01",
      bgClass: "bg-blue-50",
      textClass: "text-blue-600",
      borderHover: "hover:border-blue-300",
      shadowHover: "hover:shadow-blue-100"
    },
    { 
      icon: <FiCalendar className="text-4xl text-emerald-500" />, 
      title: "Book a Slot", 
      desc: "Choose an available date and time slot that fits your schedule.",
      stepNum: "02",
      bgClass: "bg-emerald-50",
      textClass: "text-emerald-600",
      borderHover: "hover:border-emerald-300",
      shadowHover: "hover:shadow-emerald-100"
    },
    { 
      icon: <FiPlayCircle className="text-4xl text-orange-500" />, 
      title: "Go and Play", 
      desc: "Arrive at the venue, show your booking confirmation, and enjoy.",
      stepNum: "03",
      bgClass: "bg-orange-50",
      textClass: "text-orange-600",
      borderHover: "hover:border-orange-300",
      shadowHover: "hover:shadow-orange-100"
    },
  ];

  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Booking your favorite sports venue is now easier than ever. Just follow these three simple steps.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col items-center p-8 bg-gray-600 border border-gray-100 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${step.borderHover} ${step.shadowHover}`}
            >
              {/* Step Number Badge (Floating) */}
              <div className={`absolute -top-5 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg border-4 border-white shadow-md ${step.bgClass} ${step.textClass}`}>
                {step.stepNum}
              </div>

              {/* Icon Container */}
              <div className={`p-5 rounded-full mb-6 mt-4 transition-transform duration-300 hover:scale-110 ${step.bgClass}`}>
                {step.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-[#0f172a] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-center">
                {step.desc}
              </p>
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;
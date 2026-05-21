import Banner from "./components/Banner";
import FeaturedFacilities from "./components/FeaturedFacilities";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedFacilities />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
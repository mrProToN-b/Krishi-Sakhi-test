// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';
// import FeatureCard from '../components/FeatureCard';
// import Footer from '../components/Footer';
// import Icon from '../components/AppIcon';
// import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';

// import slide1 from '../assets/slide1.png';
// import slide2 from '../assets/slide2.jpg';
// import slide3 from '../assets/slide3.jpg';
// import slide5 from '../assets/slide5.jpg';
// // Swiper imports
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import Features from './Features2';
// import Contact from './Contact';
// import Features2 from './Features2';
// import Features3 from './Features3';

// const Home = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleGetStarted = async () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate('/auth');
//     }, 1000);
//   };

//   const handleTalkToAIF = () => {
//     navigate('/Chat');
//   };


//   const heroImages = [slide1, slide3, slide2, slide5];

//   // Feature cards data
//   const featuresPreview = [
//     {
//       icon: <svg /* ... */></svg>,
//       title: 'Weather Alerts',
//       description: 'Real-time weather updates and forecasts tailored for your farm location with severe weather warnings.'
//     },
//     {
//       icon: <svg /* ... */></svg>,
//       title: 'Pest Detection',
//       description: 'AI-powered pest identification and treatment recommendations using image recognition technology.'
//     },
//     {
//       icon: <svg /* ... */></svg>,
//       title: 'Market Prices',
//       description: 'Live commodity prices and market trends to help you make informed selling decisions.'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br">
//       <Navbar />

//       {/* Hero Slider Section */}
//       {/* Hero Slider Section */}
//       <div className="w-full ">
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           spaceBetween={0}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           className="w-full"
//         >
//           {heroImages.map((img, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={img}
//                 alt={`slide-${index}`}
//                 className="w-full h-[700px] object-fit"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       <Features3 />
//       <Features2 />


//       <Contact />

//       {/* <button onClick={handleTalkToAIF} class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-strong hover:shadow-medium transition-all duration-300 flex items-center justify-center group lg:bottom-8 lg:right-8" aria-label="Open AI Assistant"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle" ><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><div class="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles" ><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg></div></button> */}
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import Navbar from '../components/Navbar';
import Features2 from './Features2';
import Features3 from './Features3';
import Contact from './Contact';

import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide5 from '../assets/slide5.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const heroImages = [slide1, slide3, slide2, slide5];

  return (
    <div className=" bg-gradient-to-br">
      <Navbar />

      {/* Hero Slider */}
      <div id="home" >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full"
        >
          {heroImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`slide-${index}`} className="w-full h-[300px] object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Features */}
      <div id="features" className="min-h-screen">
        <Features3 />
        <Features2 />
      </div>

      {/* Contact */}
      <div id="contact" className="min-h-screen">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
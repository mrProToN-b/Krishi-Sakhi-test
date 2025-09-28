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
              <img src={img} alt={`slide-${index}`} className="w-full h-[700px] object-cover" />
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

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PreImage } from './PreImage';

interface Props {
  slides: { image: string }[];
}

const SliderFull = ({ slides }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='slider-container overflow-hidden'>
      <div className='relative slider'>
        <motion.div
          className='slider-track flex-row-start'
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              exit={{ opacity: 0 }}
            >
              <PreImage
                src={slide.image}
                alt={`Slide ${index}`}
                width={1980}
                height={700}
                className='w-full object-cover rounded-lg'
              />
            </motion.div>
          ))}
        </motion.div>
        <div className='dots-container absolute bottom-3 left-1/2 transform -translate-x-1/2 flex-row-center gap-3'>
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`dot ${
                index === currentSlide ? 'active py-[5px] px-[10px] bg-white' : 'p-[5px] bg-slate-200'
              } rounded-full`}
              onClick={() => handleDotClick(index)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            ></motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderFull;

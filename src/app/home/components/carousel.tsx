import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showControls = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsAutoPlaying(true);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-60 bg-gray-200 rounded-lg">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full md:w-[100%]${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-green-800">
        {/* Slides container */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-contain"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

        </div>

        {showIndicators && images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2 absolute bottom-2 left-1/2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

        {/* Navigation controls */}
        {showControls && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>


            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}


      </div>

      {/* Indicators */}

    </div>
  );
};

export default Carousel;

// ** React Imports
import { useState } from 'react';

// ** Reactstrap Imports
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

// ** Images
import sliderImage1 from '@src/assets/images/slider/01.jpg';
import sliderImage2 from '@src/assets/images/slider/02.jpg';
import sliderImage3 from '@src/assets/images/slider/03.jpg';

const images = [
  {
    src: sliderImage2,
    id: 1
  },
  {
    src: sliderImage3,
    id: 2
  },
  {
    src: sliderImage1,
    id: 3
  }
];

const CustomSlide = () => {
  // ** States
  const [animating, setAnimating] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = images.map((item) => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item.id}>
        <img src={item.src} className="img-fluid" alt={item.id} style={{ borderRadius: '20px' }} />
      </CarouselItem>
    );
  });
  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous} keyboard={false}>
      <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};

export default CustomSlide;

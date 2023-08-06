import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './crousel.css';
const Crousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="crousel">
      <Slider {...settings} className="slider">
        <div className="one">
          <img src="images/poster5.png" alt="img"></img>
        </div>
        <div className="one">
          <img src="images/poster6.png" alt="img"></img>
        </div>
        <div className="one">
          <img src="images/poster7.png" alt="img"></img>
        </div>
        <div className="one">
          <img src="images/poster3.png" alt="img"></img>
        </div>
        <div className="one">
          <img src="images/poster9.png" alt="img"></img>
        </div>
      </Slider>
    </div>
  );
};

export default Crousel;

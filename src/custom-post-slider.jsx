import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import arrow_left_png from "./arrow-left.png";
import arrow_right_png from "./arrow-right.png";

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    },
  },
];

const CustomPostSlider = ({ slides }) => {
  const slider = useRef();
  const [curItem, setCurItem] = useState(slides[0]);

  const goToPost = (item) => {
    window.location.href = item.link;
  };
  const clickNext = () => {
    slider.current.slickNext();
  };
  const clickPrev = () => {
    slider.current.slickPrev();
  };
  const afterChange = (id) => {
    setCurItem(slides[id]);
  };

  return (
    <>
      {curItem && (
        <div className="post-header">
          <div className="post-field-date">
            <div className="episode-field">EPISODE # {curItem.field}</div>
            <div className="episode-line"></div>
            <div className="episode-date">{curItem.post_date}</div>
          </div>
          <div className="post-title">{curItem.title}</div>
        </div>
      )}
      <div className="custom-post-slider">
        <div className="slider-arrows">
          <img className="slider-click" src={arrow_left_png} alt="arrow-left" onClick={clickPrev} />
          <img className="slider-click" src={arrow_right_png} alt="arrow-right" onClick={clickNext} />
        </div>
        <div className="sliders">
          <Slider
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            centerMode={true}
            arrows={false}
            ref={(r) => (slider.current = r)}
            afterChange={afterChange.bind(this)}
            responsive={responsive}
            adaptiveHeight={true}
            centerPadding="120px"
          >
            {slides &&
              slides.map((item) => (
                <div className="slider-item" key={item.id}>
                  <img src={item.image_url} alt="slider-element" onClick={goToPost.bind(this, item)} />
                </div>
              ))}
          </Slider>
        </div>
      </div>
      {curItem && <div className="post-excerpt">{curItem.excerpt}</div>}
    </>
  );
};

export default CustomPostSlider;

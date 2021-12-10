import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";
import arrow_left_png from "./arrow-left.png";
import arrow_right_png from "./arrow-right.png";

const Carousel = ({ slideItems }) => {
  const [slideTotal, setSlideTotal] = useState(0);
  const [slideCurrent, setSlideCurrent] = useState(-1);
  const [slides, setSlides] = useState([]);
  const [height, setHeight] = useState("0px");
  const handlers = useSwipeable({
    onSwipedLeft: () => slideRight(),
    onSwipedRight: () => slideLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  useEffect(() => {
    const locSlides = [];
    slideItems.forEach((slide) => {
      const slideobject = {
        class: "slider-single proactivede",
        ...slide,
      };
      locSlides.push(slideobject);
    });
    if (slideItems.length === 2) {
      slideItems.forEach((slide) => {
        const slideobject = {
          class: "slider-single proactivede",
          ...slide,
        };
        locSlides.push(slideobject);
      });
    }
    setSlides(locSlides);
    setSlideTotal(locSlides.length - 1);
    setSlideCurrent(-1);
    if (slideCurrent === -1) {
      setTimeout(() => {
        slideRight();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideItems]);
  useEffect(() => {
    if (slideCurrent === -1) {
      setTimeout(() => {
        slideRight();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides, slideCurrent]);

  const slideRight = () => {
    let preactiveSlide;
    let proactiveSlide;
    let slideCurrentLoc = slideCurrent;

    const activeClass = "slider-single active";
    const slide = [...slides];
    if (slideTotal > 1) {
      if (slideCurrentLoc < slideTotal) {
        slideCurrentLoc++;
      } else {
        slideCurrentLoc = 0;
      }
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      const activeSlide = slide[slideCurrentLoc];
      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }

      slide.forEach((slid, index) => {
        if (slid.class.includes("preactivede")) {
          slid.class = "slider-single proactivede";
        }
        if (slid.class.includes("preactive")) {
          slid.class = "slider-single preactivede";
        }
      });

      preactiveSlide.class = "slider-single preactive";
      activeSlide.class = activeClass;
      proactiveSlide.class = "slider-single proactive";
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc);

      if (document.getElementsByClassName("slider-single active").length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName("slider-single active").length > 0) {
            const height = document.getElementsByClassName("slider-single active")[0].clientHeight;
            setHeight(`${height}px`);
          }
        }, 500);
      }
    } else if (slide[0] && slide[0].class !== activeClass) {
      slide[0].class = activeClass;
      setSlides(slide);
      setSlideCurrent(0);
    }
  };
  const slideLeft = () => {
    if (slideTotal > 1) {
      let preactiveSlide;
      let proactiveSlide;
      let slideCurrentLoc = slideCurrent;
      const slide = [...slides];
      if (slideCurrentLoc > 0) {
        slideCurrentLoc--;
      } else {
        slideCurrentLoc = slideTotal;
      }
      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }
      let activeSlide = slide[slideCurrentLoc];
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      slide.forEach((slid, index) => {
        if (slid.class.includes("proactivede")) {
          slid.class = "slider-single preactivede";
        }
        if (slid.class.includes("proactive")) {
          slid.class = "slider-single proactivede";
        }
      });
      preactiveSlide.class = "slider-single preactive";
      activeSlide.class = "slider-single active";
      proactiveSlide.class = "slider-single proactive";
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc);
      if (document.getElementsByClassName("slider-single active").length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName("slider-single active").length > 0) {
            const height = document.getElementsByClassName("slider-single active")[0].clientHeight;
            setHeight(`${height}px`);
          }
        }, 500);
      }
    }
  };
  const goToPost = (id) => {
    const activeItem = slides.find((x) => (x.class && x.class.search(" active") !== -1 ? true : false));
    if (!activeItem || activeItem.id !== id) return;
    window.location.href = activeItem.link;
  };
  const activeItem = slides.find((x) => (x.class && x.class.search(" active") !== -1 ? true : false));

  return (
    <>
      {activeItem && (
        <div className="post-header">
          <div className="post-field-date">
            <div className="episode-field">EPISODE # {activeItem.field}</div>
            <div className="episode-line"></div>
            <div className="episode-date">{activeItem.post_date}</div>
          </div>
          <div className="post-title">{activeItem.title}</div>
        </div>
      )}
      <div className="react-3d-carousel" style={{ height }} {...handlers}>
        {slides && slides.length > 0 && (
          <div className="slider-container">
            <div className="slider-content">
              {slides.map((slider) => (
                <div className={slider.class} key={slider.id}>
                  <div className="slider-left" onClick={slideLeft}>
                    <div>
                      <img src={arrow_left_png} alt="arrow-left" />
                    </div>
                  </div>
                  <div className="slider-right" onClick={slideRight}>
                    <div>
                      <img src={arrow_right_png} alt="arrow-right" />
                    </div>
                  </div>
                  <div className="slider-single-content">
                    <img src={slider.image_url} alt="slider-element" onClick={goToPost.bind(this, slider.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {activeItem && <div className="post-excerpt">{activeItem.excerpt}</div>}
    </>
  );
};
Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.element),
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
};
Carousel.defaultProps = {
  autoplay: false,
  interval: 3000,
};

const CustomPostCarousel = ({ slides }) => {
  return (
    <div className="custom-post-carousel">
      <Carousel slideItems={slides} />
    </div>
  );
};

export default CustomPostCarousel;

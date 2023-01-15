import React, { useState } from "react";
import { useEffect } from "react";
import { sliderItems } from "../data/data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Controls slider transtion
  useEffect(() => {
    const transition = setInterval(() => {
      setCurrentSlide((oldCount) => {
        if (oldCount < sliderItems.length - 1) {
          return (oldCount = oldCount + 1);
        } else {
          return (oldCount = 0);
        }
      });
    }, 5000);
    return () => {
      clearInterval(transition);
    };
  }, []);

  const handleClick = (direction) => {
    if (direction === "right") {
      setCurrentSlide(
        currentSlide < sliderItems.length - 1 ? currentSlide + 1 : 0
      );
    }
    if (direction === "left") {
      setCurrentSlide(
        currentSlide > 0 ? currentSlide - 1 : sliderItems.length - 1
      );
    }
  };

  return (
    <div className="slider">
      <div onClick={() => handleClick("left")} className="arrow left">
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div
        className="wrapper"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {sliderItems.map((item) => {
          return (
            <div
              key={item.id}
              className="slide"
              style={{ backgroundColor: `${item.bg}` }}
            >
              <div className="img-container">
                <img loading="eager" src={item.img} alt="img" />
              </div>
              <div className="info-container">
                <h1 className="title">{item.title}</h1>
                <p className="desc">{item.desc}</p>
                <button>Shop Now</button>
              </div>
            </div>
          );
        })}
      </div>
      <div onClick={() => handleClick("right")} className="arrow right">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default Slider;

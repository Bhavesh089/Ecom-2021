import React from "react";
import { Button } from "antd";
import sampleImage from "../../assets/logos/sample-img.jpg";
const CarouselItem = () => {
  return (
    <>
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-ride="carousel"
        data-interval="5000"
      >
        <ol className="carousel-indicators">
          <li
            data-target="myCarousel"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="myCarousel" data-slide-to="1"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active" data-interval="500">
            <div
              className="overlay-image"
              style={{
                backgroundImage: `url(${sampleImage})`,
              }}
            ></div>
            <div className="container">
              <h1>Example Headline</h1>
              <p>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the
              </p>
              <Button type="primary">signup today</Button>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <h1>Example Headline</h1>
              <p>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the
              </p>
              <Button type="primary">signup today</Button>
            </div>
          </div>
        </div>
        <a
          href="#myCarousel"
          className="carousel-control-prev"
          role="button"
          data-slide="prev"
        >
          <span className="sr-only">Previous</span>
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </a>
        <a
          href="#myCarousel"
          className="carousel-control-next"
          role="button"
          data-slide="next"
        >
          <span className="sr-only">Next</span>
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </a>
      </div>
    </>
  );
};

export default CarouselItem;

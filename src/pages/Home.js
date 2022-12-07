import React from "react";
import { Col, Row, Button, Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const Home = () => {
  let history = useHistory();

  return (
    <div className="title">
      <div class="container py-4">
        <header class="pb-3 mb-4 border-bottom">
          <a class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">WineLovers Website</span>
            
          </a>
        </header>
      </div>

      <Carousel>
        <Carousel.Item>
          <img
            className="image-home"
            src="https://images.ctfassets.net/8x8155mjsjdj/1af9dvSFEPGCzaKvs8XQ5O/a7d4adc8f9573183394ef2853afeb0b6/Copy_of_Red_Wine_Blog_Post_Header.png"
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption">
            <p>
              Trusted by millions to discover and buy the right wine every time.
            </p>
            <Button
              className="learn-more-button"
              onClick={() => {
                history.push("/wines");
              }}
            >
              Learn More <AiOutlineArrowRight />
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="image-home"
            src="https://www.thewinebuzz.com/wp-content/uploads/2020/10/v17n5_HolidayFoodWinePairings.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption">
            <p>Select the food and find the perfect wine that matched.</p>
            <Button
              className="learn-more-button"
              onClick={() => {
                history.push("/foodAndWine");
              }}
            >
              Learn More <AiOutlineArrowRight />
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="image-home"
            src="https://www.thewineandmore.com/wp-content/uploads/2016/04/wine_secret_1920x655.jpg"
            alt="Second slide"
          />

          <Carousel.Caption className="carousel-caption">
            <p>Tips and advices that nowhere else you cant find!</p>
            <Button
              className="learn-more-button"
              onClick={() => {
                history.push("/blog");
              }}
            >
              Learn More <AiOutlineArrowRight />
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="image-home"
            src="https://c4.wallpaperflare.com/wallpaper/647/879/732/wine-basket-bottle-grapes-wallpaper-preview.jpg"
            alt="Third slide"
          />

          <Carousel.Caption className="carousel-caption">
            <p>
              Take a small sip and swirl the wine in your mouth, so you can
              fully absorb the flavor with your taste buds.
            </p>
            <Button
              className="learn-more-button"
              onClick={() => {
                history.push("/foodAndWine");
              }}
            >
              Learn More <AiOutlineArrowRight />
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;

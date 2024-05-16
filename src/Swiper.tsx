import "swiper/css";
import { FC } from "react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type SliderProp = {
  scrollTo: string;
};

const Slider: FC<SliderProp> = ({ scrollTo }) => {
  const handleScrollTo = () => {
    const element = document.getElementById(scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
    >
      <SwiperSlide>
        <div className="swiper__inner">
          <div className="swiper__inner-content">
            <h1>
              <span>Stan Smith</span>,
              <br /> Forever!
            </h1>
            <button onClick={handleScrollTo}>Купить</button>
          </div>
          <img src="img/slider.svg" alt="Swiper" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper__inner">
          <div className="swiper__inner-content">
            <h1>
              <span>Stan Smith</span>,
              <br /> Forever!
            </h1>
            <button>Купить</button>
          </div>
          <img src="img/slider.svg" alt="Swiper" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper__inner">
          <div className="swiper__inner-content">
            <h1>
              <span>Stan Smith</span>,
              <br /> Forever!
            </h1>
            <button>Купить</button>
          </div>
          <img src="img/slider.svg" alt="Swiper" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;

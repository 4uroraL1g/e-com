import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductZoom = ({ images = [], discount = 0 }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSlider.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <div className="productZoom">
      <div className="productZoom productZoomBig position-relative mb-3">
        {discount > 0 && (
          <div className="badge badge-primary">{discount}%</div>
        )}
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={false}
          slidesPerGroup={1}
          modules={[Navigation]}
          className="zoomSliderBig"
          ref={zoomSliderBig}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="item">
                <InnerImageZoom zoomType="hover" zoomScale={1} src={img} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        navigation
        slidesPerGroup={1}
        modules={[Navigation]}
        className="zoomSlider"
        ref={zoomSlider}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={`item${slideIndex === index ? " item_active" : ""}`}
              onClick={() => goto(index)}
            >
              <img src={img} className="w-100" alt={`Product ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductZoom;
import React from "react";
import styled from "styled-components";
import IMG2 from "../Images/main_banner_img2.png";
import IMG3 from "../Images/main_banner_img3.png";
import IMG4 from "../Images/main_banner_img4.png";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper"; // 추가

import "swiper/swiper-bundle.css";
import "swiper/components/autoplay";
import "swiper/components/pagination";

SwiperCore.use([Autoplay, Pagination]);

const MainBanner = () => {
  return (
    <SwiperBx>
      <Swiper
        // style={{ height: "282px" }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        loop={true}
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        autoHeight={true}
      >
        <SwiperSlide>
          <div className="img_bx">
            <a
              href="https://docs.google.com/forms/d/1AMDgIUTvHOIO6OyzPGjpbwManaGC-eKmrolOfROjRtg/edit"
              target="_blank"
              rel="noreferrer"
            >
              <img style={{ width: "100%" }} src={IMG2} alt="배너 이미지2" />
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="img_bx">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScnvlLWbDtzPT7UTagUx4uvRVLbmeAsA-NkmhbvrvWzPqLQcA/viewform?usp=sf_link"
              target="_blank"
              rel="noreferrer"
            >
              <img style={{ width: "100%" }} src={IMG3} alt="배너 이미지3" />
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="img_bx">
            <a
              href="https://www.instagram.com/bbomomo/"
              target="_blank"
              rel="noreferrer"
            >
              <img style={{ width: "100%" }} src={IMG4} alt="배너 이미지4" />
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </SwiperBx>
  );
};
const SwiperBx = styled.div`
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0;
  }

  .swiper-container-autoheight,
  .swiper-container-autoheight .swiper-slide {
    padding-bottom: 1vh;
  }
`;
export default MainBanner;

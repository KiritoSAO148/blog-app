/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import PostCard from "./PostCard";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const images = [
  "https://sapo.aimini.vn/uploads/prizes/prizes_cmobhhheurwv4syy4ecj.png",
  "https://sapo.aimini.vn/uploads/prizes/prizes_f7xgijvbtlwhgogp70oz.png",
  "https://sapo.aimini.vn/uploads/prizes/prizes_vnkgkqsx2k9ohapjvyo6.png",
  "https://sapo.aimini.vn/uploads/prizes/prizes_nzl9l4s5wqd8jrgjsiuv.png",
  "https://sapo.aimini.vn/uploads/prizes/prizes_w55qwpwy9fdz7mscwzyg.png",
];

export const TopSlider = ({ posts }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={posts?.length === 3 ? 2 : posts?.length === 2 ? 1 : 3}
      loop={true}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
      speed={5000}
      navigation={true}
      modules={[Autoplay]}
      className="mx-auto"
    >
      {posts?.map((post, index) => (
        <SwiperSlide key={post?._id} className="w-1/3">
          <PostCard topImg={images[index]} post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

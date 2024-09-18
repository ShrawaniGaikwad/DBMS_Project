import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CarouselPage() {
  return (
    <Swiper
    observer={true}                
    observeParents={true}           
    slidesPerView={1}             
    navigation = {true}                     
    pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" alt="image 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80" alt="image 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80" alt="image 3" />
      </SwiperSlide>
    </Swiper>
  );
}

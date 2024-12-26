<script setup>
// import "vue3-carousel/dist/carousel.css";
// import { Carousel, Slide, Navigation } from "vue3-carousel";
const props = defineProps(["data"]);
const config = {
  itemsToShow: 3.95,
  wrapAround: true,
  transition: 500,
};
const products = props.data.products;
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="slide in products" :key="slide">
      <div class="carousel__item">
        <slider-image :url="slide.url" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
.carousel__slide {
  padding: 5;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>

const images = ["headphones-1.jpg", "headphones-2.jpg", "headphones-3.jpg"];

let activeImage = 0;

const sliderPlace = document.querySelector(".carousel__line");
const widthOffset = document.querySelector(".carousel").clientWidth;
sliderPlace.style.width = `${3 * widthOffset}px`;
sliderPlace.style.height = `${widthOffset}px`;
sliderPlace.style.left = `${-widthOffset}px`;

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
let flag = true;

const initSlider = () => {
  const img = document.createElement("img");
  img.alt = "";
  img.src = `./images/${images[activeImage]}`;
  sliderPlace.append(img);
  nextImageGenerate();
  prevImageGenerate();
};

const nextImageGenerate = () => {
  let nextImg = activeImage + 1;
  if (nextImg >= images.length) {
    nextImg = 0;
  }
  const img = document.createElement("img");
  img.alt = "";
  img.src = `./images/${images[nextImg]}`;
  sliderPlace.append(img);
};

const prevImageGenerate = (w = false) => {
  let prevImg = activeImage - 1;
  if (prevImg < 0) {
    prevImg = images.length - 1;
  }
  const img = document.createElement("img");
  img.alt = "";
  img.src = `./images/${images[prevImg]}`;
  if (w) img.style.width = 0;
  sliderPlace.prepend(img);
};

const nextSlide = () => {
  if (!flag) return;
  flag = !flag;
  activeImage++;
  if (activeImage >= images.length) activeImage = 0;
  nextImageGenerate();
  animate({
    duration: 1000,
    draw(progress) {
      document.querySelector(".carousel__line img").style.width = `${
        widthOffset * (1 - progress)
      }px`;
    },
    removeElement: document.querySelector(".carousel__line img"),
  });
};

const prevSlide = () => {
  if (!flag) return;
  flag = !flag;
  activeImage--;
  if (activeImage < 0) activeImage = images.length - 1;
  prevImageGenerate(true);
  animate({
    duration: 1000,
    draw(progress) {
      document.querySelector(".carousel__line img").style.width = `${
        widthOffset * progress
      }px`;
    },
    removeElement: document.querySelector(".carousel__line img:last-child"),
  });
};

initSlider();

btnPrev.addEventListener("click", prevSlide);
btnNext.addEventListener("click", nextSlide);

const animate = ({ duration, draw, removeElement }) => {
  const start = performance.now();
  requestAnimationFrame(function animate(time) {
    let step = (time - start) / duration;
    if (step > 1) step = 1;
    draw(step);
    if (step < 1) {
      requestAnimationFrame(animate);
    } else {
      removeElement.remove();
      flag = true;
    }
  });
};

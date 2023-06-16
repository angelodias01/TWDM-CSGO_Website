document.addEventListener('DOMContentLoaded', function () {

  const containers = document.querySelectorAll('.slideshow-container');

  containers.forEach(function (container) {
    const slides = container.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach(function (slide) {
        slide.style.display = 'none';
      });

      slides[index].style.display = 'block';
    }

    function showSlide(index) {
      slides.forEach(function (slide) {
        slide.classList.remove('active');
      });

      slides[index].classList.add('active');
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function preloadImages() {
      slides.forEach(function (slide) {
        const img = new Image();
        img.src = slide.querySelector('img').src;
      });
    }

    showSlide(currentIndex);
    setInterval(nextSlide, 5000);


    preloadImages();
  });

  const scrollToTopButton = document.getElementById('scrollToTop');

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });

  scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: -1,
      behavior: 'smooth'
    });
  });
});

window.addEventListener('scroll', function () {
  var backToTopButton = document.getElementById('backToTopBtn');

  if (window.scrollY >= 100) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

document.getElementById('backToTopBtn').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const sliderSkins = document.querySelector(".slider-skins");
const slidesContainer = document.getElementById("slidesContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const nameSelect = document.getElementById("nameSelect");
let slideIndexSkins = 0;

function showSlideSkins(index) {
  if (index < 0 || index >= slidesContainer.children.length) return;

  sliderSkins.style.transform = `translateX(-${index * 100}%)`;
  slideIndexSkins = index;
}

prevBtn.addEventListener("click", () => {
  showSlideSkins(slideIndexSkins - 1);
});

nextBtn.addEventListener("click", () => {
  showSlideSkins(slideIndexSkins + 1);
});

fetch("skins.json")
  .then(response => response.json())
  .then(data => {
    for (const key in data) {
      const skinData = data[key][0];

      const option = document.createElement("option");
      option.value = skinData.name;
      option.textContent = skinData.name;
      nameSelect.appendChild(option);
    }

    nameSelect.addEventListener("change", () => {
      const selectedName = nameSelect.value;
      const images = data[selectedName][0].images;

      slidesContainer.innerHTML = "";

      for (const key in images) {
        const slide = document.createElement("div");
        slide.classList.add("slider-for-skins");
        if (key === "image") {
          slide.classList.add("active");
        }

        const img = document.createElement("img");
        img.alt = key;
        img.classList.add("noStyle");

        slide.appendChild(img);
        slidesContainer.appendChild(slide);

        const imageLoader = new Image();
        imageLoader.addEventListener("load", () => {
          img.src = imageLoader.src;
        });
        imageLoader.src = images[key];
      }

      slideIndexSkins = 0;
      showSlideSkins(slideIndexSkins);
    });
  });

sliderSkins.innerHTML = skincard;
import Swiper, { Navigation, Pagination, A11y } from 'swiper';

const a11yHideInactiveSlides = function a11yHideInactiveSlides() {
    const currentSlideEl = this.slides[this.activeIndex];
    this.slides.forEach((slide) => {
        if (slide !== currentSlideEl) {
            slide.setAttribute('tabindex', '-1');
            slide.setAttribute('aria-hidden', 'true');
        } else {
            slide.removeAttribute('tabindex');
            slide.removeAttribute('aria-hidden');
        }
    });
};

export default () => {
    console.log('slider.js loaded');
    
    Swiper.use([Navigation, Pagination, A11y]);

    function initSwiper(sliderContainer) {
        const swiperContainer = sliderContainer.querySelector('.swiper');
        const swiperNext = sliderContainer.querySelector('.swiper-button-next');
        const swiperPrev = sliderContainer.querySelector('.swiper-button-prev');
        const swiperPagination =
            sliderContainer.querySelector('.swiper-pagination');

        new Swiper(swiperContainer, {
            observer: true,
            observeParents: true,
            direction: 'horizontal',
            spaceBetween: 0,
            loop: false,
            freeMode: false,
            a11y: {
                prevSlideMessage: 'Zur vorherigen Folie',
                nextSlideMessage: 'Zur nächsten Folie',
                lastSlideMessage: 'Das ist die erste Folie',
                firstSlideMessage: 'Das ist die erste Folie',
                paginationBulletMessage: 'Folie {{index}} von {{slidesLength}}',
            },
            navigation: {
                nextEl: swiperNext,
                prevEl: swiperPrev,
            },
            pagination: {
                el: swiperPagination,
                clickable: true,
                renderBullet: function (index, className, slidesLength) {
                    return `<li class="dot swiper-pagination-bullet"></li>`;
                },
            },
            slidesPerView: 1,
            on: {
                afterInit: function () {
                    a11yHideInactiveSlides.call(this);
                },
                slideChangeTransitionEnd: function () {
                    a11yHideInactiveSlides.call(this);
                },
            },
        });
    }

    const sliderImages = document.querySelectorAll('.js-imageSlider');

    sliderImages.forEach((sliderContainer) => {
        const swiperImagesContainers =
            sliderContainer.querySelectorAll('.swiper');
        swiperImagesContainers.forEach((swiperContainer) => {
            initSwiper(sliderContainer);
        });
    });

};

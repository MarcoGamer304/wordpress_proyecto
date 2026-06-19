(function() {
    'use strict';

    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel-imagenes-wrapper');

        carousels.forEach(function(carousel) {
            initCarousel(carousel);
        });
    }

    function initCarousel(carousel) {
        const container = carousel.querySelector('.carousel-imagenes-container');
        const slides = carousel.querySelectorAll('.carousel-imagenes-slide');
        const indicators = carousel.querySelectorAll('.carousel-imagenes-indicator');
        const prevArrow = carousel.querySelector('.carousel-imagenes-arrow-prev');
        const nextArrow = carousel.querySelector('.carousel-imagenes-arrow-next');
        
        const autoplay = carousel.getAttribute('data-autoplay') === 'true';
        const interval = parseInt(carousel.getAttribute('data-interval')) || 3000;
        const animation = carousel.getAttribute('data-animation') || 'fade';

        if (!container || slides.length === 0) {
            return;
        }

        let currentIndex = 0;
        let autoplayInterval = null;

        function goToSlide(index) {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }

            slides.forEach(function(slide, i) {
                slide.classList.remove('carousel-imagenes-active');
                if (i === index) {
                    slide.classList.add('carousel-imagenes-active');
                }
            });

            if (indicators.length > 0) {
                indicators.forEach(function(indicator, i) {
                    indicator.classList.remove('carousel-imagenes-indicator-active');
                    if (i === index) {
                        indicator.classList.add('carousel-imagenes-indicator-active');
                    }
                });
            }

            currentIndex = index;
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        if (prevArrow) {
            prevArrow.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
                resetAutoplay();
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', function(e) {
                e.preventDefault();
                nextSlide();
                resetAutoplay();
            });
        }

        if (indicators.length > 0) {
            indicators.forEach(function(indicator, index) {
                indicator.addEventListener('click', function(e) {
                    e.preventDefault();
                    goToSlide(index);
                    resetAutoplay();
                });
            });
        }

        function startAutoplay() {
            if (autoplay) {
                autoplayInterval = setInterval(nextSlide, interval);
            }
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }

    document.addEventListener('wp-block-library-init', function() {
        initCarousels();
    });

})();

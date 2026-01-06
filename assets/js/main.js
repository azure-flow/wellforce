document.addEventListener('DOMContentLoaded', function () {
    // Pure JS infinite flex "marquee" slider (no clones)
    (function () {
        const marqueeList = document.getElementById('marquee-list');
        const marqueeContainer = document.getElementById('marquee-container');
        const items = Array.from(marqueeList.children);
        const gap = 40; // px, keep in sync with gap-[40px]

        let totalWidth = 0;
        items.forEach((item) => {
            totalWidth += item.offsetWidth + gap;
        });

        // Remove last gap for exact width
        totalWidth -= gap;

        let pos = 0;
        let lastTimestamp = null;

        function animateMarquee(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            let elapsed = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            // speed: px per second
            let speed = 80;
            pos -= speed * (elapsed / 1000);
            if (pos <= -totalWidth) {
                pos += totalWidth;
            }

            // Move list
            marqueeList.style.transform = `translateX(${pos}px)`;

            // Move first item to the end if completely out of view
            while (true) {
                const firstItem = marqueeList.children[0];
                const firstWidth = firstItem.offsetWidth + gap;
                if (pos <= -firstWidth) {
                    marqueeList.appendChild(firstItem);
                    pos += firstWidth;
                } else {
                    break;
                }
            }

            // Move last item to the beginning if scrolled back (for robustness)
            while (true) {
                const lastItem = marqueeList.children[marqueeList.children.length - 1];
                const lastWidth = lastItem.offsetWidth + gap;
                if (pos > 0) {
                    marqueeList.insertBefore(lastItem, marqueeList.children[0]);
                    pos -= lastWidth;
                } else {
                    break;
                }
            }

            requestAnimationFrame(animateMarquee);
        }

        // Wait for images/fonts, then run marquee
        window.addEventListener('load', () => {
            requestAnimationFrame(animateMarquee);
        });
    })();

    const initiativeSwiperEl = document.querySelector('.swiper-initiative');
    if (initiativeSwiperEl) {
        new Swiper('.swiper-initiative', {
            slidesPerView: 1.1,
            spaceBetween: 0,
            breakpoints: {
                900: {
                }
            },
            spaceBetween: 55,
            speed: 900,
            loop: true,
            centeredSlides: false,
            // autoplay: {
            //     delay: 3400,
            //     disableOnInteraction: false
            // },
            navigation: {
                nextEl: '.initiative-swiper-next',
                prevEl: '.initiative-swiper-prev'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                900: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            }
        });
    }

    // ------------------------------------------------------------

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menu_modal = document.getElementById('menu_modal');

    function toggleModal() {
        if (menu_modal.classList.contains('opacity-0')) {
            // open
            menu_modal.classList.remove('pointer-events-none', 'opacity-0');
            menu_modal.classList.add('pointer-events-auto', 'opacity-100');
        } else {
            // close
            menu_modal.classList.add('opacity-0');
            menu_modal.classList.remove('opacity-100', 'pointer-events-auto');
            menu_modal.classList.add('pointer-events-none');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleModal);
    }

    document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape' || e.key === 'Esc') && !menu_modal.classList.contains('opacity-0')) {
            toggleModal();
        }
    });

    //

    function updateAboutSwiperHeight() {
        const nextSlide = document.querySelector('.top-about-swiper .swiper-slide-next img');
        const container = document.querySelector('.top-about-swiper .swiper-wrapper');
        if (nextSlide && container) {
            const h = nextSlide.offsetHeight;
            container.style.height = h + 'px';
        }
    }

    // Debounce to ensure function runs AFTER window resizing is completed
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateAboutSwiperHeight();
        }, 500);
    });

    // Optionally: Also update on DOMContentLoaded for correct initial state
    setTimeout(() => {
        updateAboutSwiperHeight();
    }, 500);

    const about_swiper = new Swiper('.top-about-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        loop: true,
        speed: 750,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.about-slider-next',
            prevEl: '.about-slider-prev'
        },
        loopedSlides: document.querySelectorAll('.top-about-swiper .swiper-slide').length,
        on: {
            beforeInit: function (swiper) {
                swiper.params.loopAdditionalSlides = 2;
            },
            click: function (swiper, event) {
                const clickedSlide = swiper.clickedSlide;
                const activeIndex = swiper.activeIndex;
                const clickedIndex = swiper.slides.indexOf(clickedSlide);
                if (!clickedSlide) return;

                if (clickedIndex === activeIndex) {
                    swiper.slidePrev();
                } else if (clickedIndex - activeIndex === 2 || clickedIndex - activeIndex === 3) {
                    swiper.slideNext();
                }
            }
        }
    });

    about_swiper.slidePrev();
});

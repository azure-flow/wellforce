document.addEventListener('DOMContentLoaded', function () {


    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        function toggleScrollToTopButton() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            }
        }

        // Scroll to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event listeners
        window.addEventListener('scroll', toggleScrollToTopButton);
        scrollToTopBtn.addEventListener('click', scrollToTop);

        // Initial check
        toggleScrollToTopButton();
    }
    

    const initiativeSwiperEl = document.querySelector('.swiper-initiative');
    if (initiativeSwiperEl) {
        new Swiper('.swiper-initiative', {
            slidesPerView: 1.1,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 32
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            },
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
        });
    }

    // News Swiper - Mobile slider (1 slide on mobile, 3 slides on desktop)
    const newsSwiperEl = document.querySelector('.swiper-news');
    if (newsSwiperEl) {
        new Swiper('.swiper-news', {
            slidesPerView: 1,
            spaceBetween: 32,
            speed: 600,
            loop: true,
            navigation: {
                nextEl: '.news-swiper-next',
                prevEl: '.news-swiper-prev'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 32
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            }
        });
    }

    const brandSwiperEl = document.querySelector('.swiper-brands');
    if (brandSwiperEl) {
        const swiperBrands = new Swiper('.swiper-brands', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 31,
            breakpoints: {
                768: {
                    spaceBetween: 40,
                }
            },
            speed: 8000,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                disableOnInteraction: false
            }
        });
    }
    const swiperBrands02 = new Swiper('.swiper-brands02', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 31,
        speed: 2000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true, // 追加: スライドの方向を逆にする
          },
    });
    const swiperCompanyBrands01 = new Swiper('.swiper-company-brands01', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 31,
        breakpoints: {
            1440: {
                spaceBetween: 62,
            }
        },
        speed: 2000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
          },
    });
    const swiperCompanyBrands02 = new Swiper('.swiper-company-brands02', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 31,
        breakpoints: {
            1440: {
                spaceBetween: 62,
            }
        },
        speed: 2000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true, // 追加: スライドの方向を逆にする
          },
    });

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
});

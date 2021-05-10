// Шаблоны для динамической вставки 
const templates = (document.querySelector('templates')) ? document.querySelector('templates') : document.body

// Слейдер на главной странице
const heroSlider = new Swiper('#heroSlider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed: 400,
  allowTouchMove: true,
  autoplay: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,

  },

  pagination: {
    el: '.hero-pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'pagination-item',
    bulletActiveClass: 'current',
    renderBullet: function (index, className) {
      let item = templates.querySelector('#js-heroPagination')

      return item.innerHTML
    }
  },

  // Navigation arrows
  navigation: {
    nextEl: '.hero-slider__arrow.next',
    prevEl: '.hero-slider__arrow.prev',
  },
  on: {
    init: function () {
      let container = document.querySelector('#heroSlider')

      let fraction = container.querySelector('.hero-slider__fraction')
      if (fraction)
        fraction.textContent = '1/' + container.getAttribute('data-slides-count')
    },
  },

  breakpoints: {
    // when window width is >= 768px
    760: {
      allowTouchMove: false,

    },
  }

});


heroSlider.on('activeIndexChange', function () {
  let fraction = heroSlider.el.querySelector('.hero-slider__fraction')
  if (fraction)
    fraction.textContent = (heroSlider.realIndex + 1) + '/' + heroSlider.el.getAttribute('data-slides-count')
});




// Слайдер личный кабинет родителя на главной странице 
if (document.querySelector('#profileSlider') && document.querySelector('#modalProfileSlider')) {
  let profileSlideOffset = (window.innerWidth - document.querySelector('#wrap').clientWidth) / 2
  const profileSlider = new Swiper('#profileSlider', {
    speed: 400,
    direction: 'horizontal',
    slidesPerView: "auto",
    slidesOffsetBefore: profileSlideOffset,
    slidesOffsetAfter: profileSlideOffset,
    spaceBetween: 10,


    breakpoints: {
      // when window width is >= 768px
      768: {
        spaceBetween: 30,

        navigation: {

          nextEl: '.profile-slider__arrow.next',
          prevEl: '.profile-slider__arrow.prev',
        },
      },
      // when window width is >= 425
      425: {
        spaceBetween: 20,
      }
    }
  });


  profileSlider.slides.forEach(function (slide) {
    slide.addEventListener('click', function (e) {
      let modalProfile = document.querySelector('.modal-profile')
      if (modalProfile) {
        modalProfile.classList.add('active')
        document.querySelector('body').style.overflow = 'hidden'
        modalProfileSlider.init()
        modalProfileSlider.slideTo(profileSlider.clickedIndex)

      }
    })
  })

  // Слайдер в модальном окне для информации о личном кабинете родителя 
  const modalProfileSlider = new Swiper('#modalProfileSlider', {
    speed: 100,
    direction: 'horizontal',
    slidesPerView: 1,
    autoHeight: true,
    navigation: {
      nextEl: '.modal-profile__arrow.next',
      prevEl: '.modal-profile__arrow.prev',
    },
    spaceBetween: 10,
    effect: 'fade',
    init: false,

  });
}
// Обрезка текста в карточках новостей
const newsBlocks = document.querySelectorAll('.js-news-block')

if (newsBlocks.length > 0) {
  newsBlocks.forEach(function (item) {
    let textBlock = item.querySelector('.js-news-block__text')
    if (textBlock && item.hasAttribute('data-max-text-length')) {
      let maxTextLength = Number(item.getAttribute('data-max-text-length'))
      let text = textBlock.textContent
      // удалить пробелы (и табы) в строке (ведущие и завершающие)
      text = text.replace(/ +/g, ' ').trim();
      let curTextLength = text.length

      // Обрезать текст, если это требуется
      if (curTextLength >= maxTextLength) {
        text = text.substr(0, maxTextLength)
        textBlock.textContent = text + '...'
      }


    }
  })
}


// Закрытие модальных окон 

const modalCloseBtns = document.querySelectorAll('.modal-close')
if (modalCloseBtns.length > 0) {
  modalCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let modal = btn.parentElement.parentElement
      if (modal.classList.contains('modal')) {
        modal.classList.remove('active')
        document.querySelector('body').style.overflow = 'auto'
      }
    })
  })
}



// слайдер на странице О проекте (слайдер сервисов). имеет сложенный слайдер 

const serviceSlider = new Swiper('#serviceSlider', {
  // Optional parameters
  speed: 200,
  autoHeight: true,
  allowTouchMove: false,
  spaceBetween: 25,
  effect: 'swipe',

  pagination: {
    el: '.service-nav_mb',
    type: 'bullets',
    clickable: true,
    bulletClass: 'service-nav__item ',
    bulletActiveClass: 'current',
    renderBullet: function (index, className) {
      let serviceSlides = document.querySelectorAll('.service-slide')
      let navItem = index + 1
      if (serviceSlides[index])
        navItem = serviceSlides[index].querySelector('.service-slide__title').innerHTML

      return '<div class="' + className + '">' + navItem + '</div>';
    }
  },

  breakpoints: {
    // when window width is >= 768px
    1024: {
      pagination: {
        el: '.service-nav',
        type: 'bullets',
        clickable: true,
        bulletClass: 'service-nav__item ',
        bulletActiveClass: 'current',
        renderBullet: function (index, className) {
          let serviceSlides = document.querySelectorAll('.service-slide')
          let navItem = index + 1
          if (serviceSlides[index])
            navItem = serviceSlides[index].querySelector('.service-slide__title').innerHTML

          return '<div class="' + className + '">' + navItem + '</div>';
        }
      },

    },
  }

});
serviceSlider.on('slideChange', function () {
  // Прокрутить навигацию до текущего элемента (на декстопах)
  // текущий булет 
  // console.log($('.service-nav__item.current').offset().top)
  // let offset = 0;
  // $('.service-nav__item').each(function( index ) {
  //   if (index == serviceSlider.realIndex)
  //   {
  //     offset = $(this).offset().top
  //   }
  // })

  // $('.service-nav').animate({
  //   scrollTop: $('.service-nav__item.current').offset().top
  // }, 300)

})

const servicePhotoSlider = new Swiper('#servicePhotos', {
  // Optional parameters
  speed: 400,
  spaceBetween: 15,
  loop: true,
  effect: 'fade',
  // Navigation arrows

  navigation: {
    nextEl: '.service-photos-arrow.next',
    prevEl: '.service-photos-arrow.prev',
  },
  pagination: {
    el: '.service-photos-pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'service-photos-pagination__item ',
    bulletActiveClass: 'current',
    renderBullet: function (index, className) {


      return '<div class="' + className + '"></div>';
    }
  },

});

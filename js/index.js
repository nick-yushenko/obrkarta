// Слейдер на главной странице
const heroSlider = new Swiper('#heroSlider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed: 400,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    // type: 'custom',
    // renderCustom: function (swiper, current, total) {

    //   let html = ''

    //   for (let i = 0; i < total; i++){
    //     html+= '<div></div>'
    //   }

    //   return html
    // }
  },

  // Navigation arrows
  navigation: {
    nextEl: '.hero-slider__arrow.next',
    prevEl: '.hero-slider__arrow.prev',
  },


});

// Слайдер в модальном окне для информации о личном кабинете родителя 
const modalProfileSlider = new Swiper('#modalProfileSlider', {
  speed: 100,
  direction: 'horizontal',
  slidesPerView: 1,
  navigation: {
    nextEl: '.modal-profile__arrow.next',
    prevEl: '.modal-profile__arrow.prev',
  },
  spaceBetween: 10,
  effect: 'fade',
  init: false,

});

// Слайдер личный кабинет родителя на главной странице 
let profileSlideOffset = (window.innerWidth - document.querySelector('.wrap').clientWidth) / 2
const profileSlider = new Swiper('#profileSlider', {
  speed: 400,
  direction: 'horizontal',
  slidesPerView: "auto",
  spaceBetween: 30,
  slidesOffsetBefore: profileSlideOffset,
  slidesOffsetAfter: profileSlideOffset,
  navigation: {
    nextEl: '.profile-slider__arrow.next',
    prevEl: '.profile-slider__arrow.prev',
  },

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
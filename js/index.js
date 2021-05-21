// Шаблоны для динамической вставки 
const templates = (document.querySelector('templates')) ? document.querySelector('templates') : document.body

// якорные ссылки 
let headerHeight = 0
if (document.querySelector('.header')) {
  headerHeight = document.querySelector('.header').clientHeight
}
const anchors = document.querySelectorAll('a.anchor')
if (anchors)
  anchors.forEach(function (item) {
    item.addEventListener('click', function () {
      let blockID = item.getAttribute('href').substring(1)
      let paddingTop = $('#' + blockID).css('padding-top')
      paddingTop = paddingTop.substr(0, paddingTop.length - 2)
      if (paddingTop > 10) {
        console.log(paddingTop)
      }
      $("html, body").animate({
        scrollTop: $('#' + blockID).offset().top + Number(paddingTop) - 10 - headerHeight + "px"
      }, {
        duration: 500,
        easing: "swing"
      });
    })
  })
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
if (document.querySelector('#profileSlider')) {
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
  if (document.querySelector('.modal-profile'))
    var modalProfileSlider = new Swiper('#modalProfileSlider', {
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
    1025: {
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

// Слайдер на страницах сотруднечества 
const coopSlider = new Swiper('#coopSlider', {
  // Optional parameters
  speed: 300,
  spaceBetween: 15,
  loop: true,
  effect: 'fade',
  // Navigation arrows
  autoplay: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,

  },
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
const coopSlider2 = new Swiper('#coopSlider2', {
  // Optional parameters
  speed: 300,
  spaceBetween: 15,
  loop: true,
  effect: 'fade',
  // Navigation arrows
  autoplay: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,

  },
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


// подсказки для инпутов 
const inputs = document.querySelectorAll('.input-block.js-hint')
if (inputs.length > 0) {
  inputs.forEach(function (item) {
    let input = item.querySelector('input')
    input.addEventListener('input', function (e) {
      if (input.value.length == 0)
        input.classList.remove('notEmpty')
      else
        input.classList.add('notEmpty')
    })
  })
}
const textareas = document.querySelectorAll('.textarea-block.js-hint')
if (textareas.length > 0) {
  textareas.forEach(function (item) {
    let textarea = item.querySelector('textarea')
    textarea.addEventListener('input', function (e) {
      if (textarea.value.length == 0)
        textarea.classList.remove('notEmpty')
      else
        textarea.classList.add('notEmpty')
    })
  })
}

// ---------
// Валидации
// ---------

// Маска ввода номера телефона
$('input.phone').mask('(000) 000-00-00')

// Валидация формы обратной связи (сотрудничество, франшиза и тд)

$.validator.addMethod("pwcheckallowedchars", function (value) {
  return /^[a-zA-Zа-яА-я-() ]+$/.test(value) // has only allowed chars letter
}, "Недопустимое значение");

$('#brifForm').validate({
  rules: {
    obrmail: {
      email: true
    },
    obrname: {
      required: true,
      pwcheckallowedchars: true,
    },
    obrtel: {
      required: true
    },
    message: {
      required: true
    },

  },
  messages: {
    obrmail: {
      email: jQuery.validator.format('Введен некорректный e-mail')
    },
    obrname: {
      required: jQuery.validator.format("Поле не заполнено"),
      minlength: jQuery.validator.format("Минимум 2 символа"),
      maxlength: jQuery.validator.format("Максимум 80 символов"),
    },
    obrtel: {
      required: jQuery.validator.format("Поле не заполнено"),
      minlength: jQuery.validator.format("номер указан неполностью"),

    },
    message: {
      required: jQuery.validator.format("Поле не заполнено"),
      minlength: jQuery.validator.format("Минимум 10 символов"),

    }
  },
  errorElement: "span",
  errorClass: "invalid",
  highlight: function (element) {
    $(element).parent().addClass("invalid");
  },
  unhighlight: function (element) {
    $(element).parent().removeClass("invalid");
  },
  focusInvalid: false,
  onkeyup: function (element) {
    let submit = document.querySelector(' #brifForm .form-submit')

    if ($('#brifForm').validate().checkForm()) {
      submit.classList.remove('disabled')
    } else {
      submit.classList.add('disabled')
    }

    // этот код взят из события onkeyup по умолчанию. Нужен чтобы скрывать/показывать ошибку после каждого введенного символа 
    var excludedKeys = [
      16, 17, 18, 20, 35, 36, 37,
      38, 39, 40, 45, 144, 225
    ];
    if (event.which === 9 && this.elementValue(element) === "" || $.inArray(event.keyCode, excludedKeys) !== -1) {
      return;
    } else if (element.name in this.submitted || element.name in this.invalid) {
      this.element(element);
    }
  },


});


//  Страница  локкеров. Эффект при наведении 

const lockerItems = document.querySelectorAll('.inside-item')
const lockerNavItems = document.querySelectorAll('.inside-img .i')

if (lockerItems && lockerNavItems) {
  lockerNavItems.forEach(function (navItem) {
    navItem.addEventListener('mouseover', function (e) {
      let navItemNum = navItem.getAttribute('data-num')
      lockerItems.forEach(function (item) {
        let itemNum = item.getAttribute('data-num')
        if (navItemNum == itemNum) {
          item.classList.add('current')
        } else {
          item.classList.remove('current')

        }
      })
    })
    navItem.addEventListener('mouseout', function (e) {
      lockerItems.forEach(function (item) {
        item.classList.remove('current')
      })
    })
  })
}
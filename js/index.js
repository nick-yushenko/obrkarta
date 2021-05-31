// Шаблоны для динамической вставки 
const templates = (document.querySelector('.templates')) ? document.querySelector('.templates') : document.body

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
      $("html, body").animate({
        scrollTop: $('#' + blockID).offset().top + Number(paddingTop) - 10 - headerHeight + "px"
      }, {
        duration: 500,
        easing: "swing"
      });
    })
  })

// открытие меню на планшетах и мобилках 
const burgerBtns = document.querySelectorAll('.js-burger')
const menu = document.querySelector('#menu')
if (menu && burgerBtns.length > 0) {
  burgerBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      menu.classList.toggle('active')
      btn.classList.toggle('active')
      $('.header').toggleClass('menuOpened');
    })
  })


}

// Клик вне меню 

$(document).click(function (e) {
  if (!$(e.target).closest('.header').length) { // клик не на хедер
    if ($(e.target).closest('#menu').length) {
      return;
    }
    else {
      $('#menu').removeClass('active');
      $('.js-burger').removeClass('active');
      $('.header').removeClass('menuOpened');


    }
  }
  // if (menu && menu.classList.contains('active')) {
  //   if (!$(e.target).closest('#menu').length) {
  //     $('#menu').removeClass('active');
  //   }
  // }
  // else {
  //   alert('no active menu')
  // }
});


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
  // effect: 'fade',
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
// $('input.phone').mask('+7 (000) 000-00-00')

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
      minlength: jQuery.validator.format("Номер указан не полностью"),

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

// Валидация формы заказа 
$('#orderForm').validate({
  rules: {

    orderName: {
      required: true,
      pwcheckallowedchars: true,
    },

    orderTel: {
      required: true,
    },
    student: {
      required: true,
    }



  },
  messages: {

    orderName: {
      required: jQuery.validator.format("Поле не заполнено"),
      minlength: jQuery.validator.format("Минимум 2 символа"),
      maxlength: jQuery.validator.format("Максимум 80 символов"),
    },
    orderTel: {
      required: jQuery.validator.format("Поле не заполнено"),
      minlength: jQuery.validator.format("Номер указан не полностью"),

    },
    student: {
      required: jQuery.validator.format("Поле не заполнено"),

    },


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
    let submit = document.querySelector(' #orderForm .form-submit')

    if ($('#orderForm').validate().checkForm()) {
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
  // Ховеры
  lockerItems.forEach(function (item) {
    item.addEventListener('mouseover', function (e) {
      let num = item.getAttribute('data-num')
      item.classList.add('current')

      lockerNavItems.forEach(function (navItem) {
        let navNum = navItem.getAttribute('data-num')
        if (num == navNum) {
          navItem.classList.add('current')

        }
        else {

          navItem.classList.remove('current')
          navItem.classList.remove('current-click')

        }
      })
    })
    item.addEventListener('mouseout', function (e) {

      item.classList.remove('current')

      lockerNavItems.forEach(function (navItem) {
        navItem.classList.remove('current')
      })
    })
  })
  lockerNavItems.forEach(function (navItem) {

    navItem.addEventListener('mouseover', function (e) {
      navItem.classList.add('current')

      let navNum = navItem.getAttribute('data-num')
      lockerItems.forEach(function (item) {
        let num = item.getAttribute('data-num')

        if (num == navNum)
          item.classList.add('current')
        else {
          item.classList.remove('current')
          navItem.classList.remove('current-click')


        }
      })
    })
    navItem.addEventListener('mouseout', function (e) {
      navItem.classList.remove('current')


      lockerItems.forEach(function (item) {
        item.classList.remove('current')
      })
    })
  })

  // Клик на элемент 
  // lockerItems.forEach(function (item) {
  //   item.addEventListener('click', function (e) {
  //     let num = item.getAttribute('data-num')

  //     lockerNavItems.forEach(function (navItem) {
  //       let navNum = navItem.getAttribute('data-num')
  //       if (num == navNum) {
  //         navItem.classList.add('current-click')

  //         item.classList.add('current-click')

  //       } else {
  //         navItem.classList.remove('current')
  //         navItem.classList.remove('current-click')

  //       }
  //     })
  //   })

  // })

  // lockerNavItems.forEach(function (navItem) {
  //   navItem.addEventListener('click', function (e) {
  //     let navNum = navItem.getAttribute('data-num')
  //     lockerItems.forEach(function (item) {
  //       let num = item.getAttribute('data-num')

  //       if (num == navNum) {
  //         item.classList.add('current-click')
  //         navItem.classList.add('current-click')
  //       } else {
  //         item.classList.remove('current')
  //         item.classList.remove('current-click')

  //       }
  //     })
  //   })

  // })
}



// Страница заказа 

const orderItems = document.querySelectorAll('.order-item')
const orderColors = document.querySelectorAll('.order-color')
const orderTypes = document.querySelectorAll('.order-type')

const orderOptions = document.querySelectorAll('.order-option')
const orderOptionColor = document.querySelector('.js-option-color')
const orderOptionType = document.querySelector('.js-option-type')

const orderStudents = document.querySelectorAll('.js-orderDataStudentName')
// Поля формы 
const orderItemNameInput = document.querySelector('.js-orderInputItemName')
const orderUserNameInput = document.querySelector('.js-orderInputUserName')
const orderAddressInput = document.querySelector('.js-orderInputAddress')
const orderPriceInput = document.querySelector('.js-orderInputPrice')
const orderBankBookInput = document.querySelector('.js-orderInputBankBook')

// Отображение заказка  
const orderPhoto = document.querySelector('.js-orderImg')
const orderItemName = document.querySelector('.js-orderItemName')
const orderUserName = document.querySelector('.js-orderUserName')
const orderAddress = document.querySelector('.js-orderAddress')
const orderPrice = document.querySelector('.js-orderPrice')


let order = {
  type: 'Не выбрано',
  color: 'Не выбрано',
  address: 'Не выбрано',
  price: 'Не выбрано',
  imgUrl: 'img/pages/order/colors/color-3.png',  // По умолчанию выбран этот цвет
  student: 'Не выбрано',
  bankBook: 'Не выбрано'
}
if (orderItems) {
  orderItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      orderItems.forEach(function (i) {
        i.classList.remove('current')
      })
      item.classList.add('current')

      let target = item.getAttribute('data-target')

      if (target == 'color') { // Выбран браслет
        orderColors.forEach(function (color) {
          if (color.classList.contains('current')) {
            order.type = color.getAttribute('data-order-item-name')
            order.imgUrl = color.getAttribute('data-order-url')
          }
        })
        order.price = item.getAttribute('data-order-price')
        setOrder()
        orderOptions.forEach(function (opt) {
          opt.classList.remove('opened')
        })
        orderOptionColor.classList.add('opened')
      }
      if (target == 'null') { // Выбран брелок
        order.price = item.getAttribute('data-order-price')
        order.type = item.getAttribute('data-order-type')
        order.imgUrl = item.getAttribute('data-order-url')
        setOrder()
        orderOptions.forEach(function (opt) {
          opt.classList.remove('opened')
        })
      }
      if (target == 'type') { // выбрана карта
        orderTypes.forEach(function (type) {
          if (type.classList.contains('current')) {
            order.price = type.getAttribute('data-order-price')
            order.imgUrl = type.getAttribute('data-order-url')
            order.type = type.getAttribute('data-order-item-name')
            setOrder()
          }

        })
        orderOptions.forEach(function (opt) {
          opt.classList.remove('opened')
        })
        orderOptionType.classList.add('opened')
      }


    })
  })
}
if (orderColors) {
  orderColors.forEach(function (item) {
    item.addEventListener('click', function (e) {
      order.type = item.getAttribute('data-order-item-name')
      order.imgUrl = item.getAttribute('data-order-url')

      setOrder()


      orderColors.forEach(function (i) {
        i.classList.remove('current')
      })
      item.classList.add('current')
    })
  })
}
if (orderTypes) {
  orderTypes.forEach(function (item) {
    item.addEventListener('click', function () {

      order.price = item.getAttribute('data-order-price')
      order.imgUrl = item.getAttribute('data-order-url')
      order.type = item.getAttribute('data-order-item-name')
      setOrder()

      orderTypes.forEach(function (t) {
        t.classList.remove('current')
      })
      item.classList.add('current')
    })
  })
}

if (orderStudents) {
  orderStudents.forEach(function (st) {
    st.addEventListener('click', function (e) {
      order.student = st.getAttribute('data-name')
      order.bankBook = st.getAttribute('data-phone')

      setOrder()
    })
  })
}

initOrder()
setOrder()

function setOrder() {
  if (orderPhoto && orderItemName && orderAddress && orderPrice && orderUserName && orderItemNameInput
    && orderAddressInput && orderPriceInput && orderBankBookInput) {
    orderPhoto.setAttribute('src', order.imgUrl)
    orderItemName.textContent = order.type
    orderAddress.textContent = order.address
    orderPrice.textContent = order.price + ' руб.'
    orderUserName.textContent = order.student

    orderItemNameInput.value = order.type
    orderAddressInput.value = order.address
    orderPriceInput.value = order.price
    orderBankBookInput.value = order.bankBook
  }

}


// Проверка, какие настройки тавара по умолчанию
function initOrder() {
  if (orderItems)
    orderItems.forEach(function (item) {
      if (item.classList.contains('current')) {
        if (item.getAttribute('data-target') == 'null') // Если нет дополнительных настроек товара (Выбран брелок)
          order.type = item.getAttribute('data-order-type')
        else { // Если есть дополнительные настройки товара (Выбрана карта или браслет )
          if (item.getAttribute('data-target') == 'color') { // (выбрана карта)
            orderColors.forEach(function (colorItem) {
              if (colorItem.classList.contains('current')) {
                order.imgUrl = colorItem.getAttribute('data-order-url')
                order.type = colorItem.getAttribute('data-order-item-name')
                order.price = item.getAttribute('data-order-price')
              }
            })
          }
          if (item.getAttribute('data-target') == 'null') { // (выбран релок)
            order.price = item.getAttribute('data-order-price')
            order.type = item.getAttribute('data-order-type')
            order.imgUrl = item.getAttribute('data-order-url')
          }
          if (item.getAttribute('data-target') == 'type') { // (выбран релок)
            orderTypes.forEach(function (type) {
              if (type.classList.contains('current')) {
                order.price = type.getAttribute('data-order-price')
                order.imgUrl = type.getAttribute('data-order-url')
                order.type = type.getAttribute('data-order-item-name')
              }

            })
          }

        }
      }
    })

}





// FAQ 
const faqItems = document.querySelectorAll('.faq-item')
console.log(templates)
if (faqItems.length > 0) {
  faqItems.forEach(function (item) {
    let itemBody = item.querySelector('.faq-body')

    let clone = itemBody.cloneNode(true);
    clone.classList.add('template')
    clone.classList.add('template')
    templates.appendChild(clone);


    item.querySelector('.faq-head').addEventListener('click', function (e) {
      item.classList.toggle('opened')
      if (item.classList.contains('opened')) {
        try {
          item.querySelector('.faq-body').style.height = clone.clientHeight + 'px'
        } catch (e){
          item.querySelector('.faq-body').style.height = 'max-content'

        }
      }
      else
        item.querySelector('.faq-body').style.height = 0

    })

  })
}
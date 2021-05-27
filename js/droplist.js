(function ($) { // <----- Начало обертки

  $('.select').on('focus', '.select__head', onSelectFocus);

  $('.select__head input').on('focus', onInputFocus)

  // Выбор элемента из списка
  $('.select').on('click', '.select__item', droplistChooseItem);

  function onSelectFocus() {
    if (!this.parentElement.classList.contains('disable')) { // Отключить предыдущие 
      $('.select__head').removeClass('open');
      $('.select__list').fadeOut(5);
      // включить текущую 
      $(this).addClass('open');
      $(this).next().fadeIn(5);


    }
  }

  function onInputFocus() {
    if (!this.parentElement.classList.contains('select__head')) {
      if ($('.select__head'))
        $('.select__head').removeClass('open');
      if ($('.select__list'))
        $('.select__list').fadeOut(5);

    }
  }

  function droplistChooseItem() {

    $('.select__head').removeClass('open');
    $('.select__head').addClass('notEmpty');
    $('.select__head').removeClass('error');
    $('.select__list').fadeOut(5);


    const selectInput = this.parentElement.parentElement.parentElement.querySelector('.select__head').querySelector('input')
    const selectHiddenInput = this.parentElement.parentElement.parentElement.querySelector('.select__input')
    const selectCur = this.parentElement.parentElement.parentElement.querySelector('.select__head .select-cur')
    if (selectCur) {
      let curImg = selectCur.querySelector('img')
      let curName = selectCur.querySelector('.name')
      let curPhone = selectCur.querySelector('.phone')
      let img = this.querySelector('img')
      let name = this.querySelector('.name')
      let phone = this.querySelector('.phone')

      curPhone.textContent = phone.textContent
      curName.textContent = name.textContent
      curImg.setAttribute('src', img.getAttribute('src'))
      // для того, чтобы работала валидация 
      selectInput.setAttribute('value', this.getAttribute('data-name'))
      selectInput.value = this.getAttribute('data-name')
    } else {
      let UserName = this.getAttribute('data-name')
      let UserPhone = this.getAttribute('data-phone')
      if (selectInput && selectHiddenInput) {
        //  Сперва показать в дроплисте
        selectInput.setAttribute('value', UserName)
        selectInput.value = UserName
        // Затем присвоить значение, которое будет передоваться на сервер
        selectHiddenInput.value = UserName

      } else {
        console.er('ERROR: в теле выпадающего списка отсутвует поле выбора элемента')
      }
    }


  }

  document.querySelectorAll('.select input').forEach(function (input) {


    input.addEventListener('input', function (e) {

      let str = /[^A-Za-zА-Яа-яЁё]/g
      input.value = input.value.replace(str, '')
      var request = input.value.toUpperCase()

      var listWrap = input.parentElement.nextElementSibling
      var results = listWrap.querySelectorAll('.select__item')


      var elemToShow = 0;
      results.forEach(function (item) {
        var userName = item.textContent.toUpperCase();
        var dataSearch = ''
        if (item.hasAttribute('data-search')) {
          dataSearch = item.getAttribute('data-search').toUpperCase()
        }
        // console.log(item)
        // console.log(dataSearch)
        if (userName.indexOf(request) != -1 || request.indexOf(userName) != -1) {

          item.style.display = 'block'

          elemToShow++

        } else if (dataSearch != '' && (dataSearch.indexOf(request) != -1 || request.indexOf(dataSearch) != -1)) {
          item.style.display = 'block'

          elemToShow++
        } else {
          item.style.display = 'none'

        }

        if (elemToShow == 0) {
          if (listWrap.querySelector('.empty'))
            listWrap.querySelector('.empty').style.display = 'block'
        } else {
          if (listWrap.querySelector('.empty'))
            listWrap.querySelector('.empty').style.display = 'none'

        }
      })
    })

  })

  $(document).click(function (e) {
    if (!$(e.target).closest('.select').length) {
      $('.select__head').removeClass('open');
      $('.select__list').fadeOut(5);
    }
  });

})(jQuery);
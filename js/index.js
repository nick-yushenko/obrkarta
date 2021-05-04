// Слейдер на главной странице

const swiper = new Swiper('#heroSlider', {
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


// Обрезка текста в карточках новостей
const newsBlocks = document.querySelectorAll('.js-news-block')

if (newsBlocks.length > 0) {
  newsBlocks.forEach(function (item) {
    let textBlock = item.querySelector('.js-news-block__text')
    if (textBlock && item.hasAttribute('data-max-text-length')) {
      let maxTextLength = Number(item.getAttribute('data-max-text-length')) 
      let text = textBlock.textContent
      // удалить пробелы (и табы) в строке (ведущие и завершающие)
      text = text.replace(/^\s*/,'').replace(/\s*$/,'');
      let curTextLength = text.length
      if (curTextLength  >= maxTextLength){
        console.log('ye;yj j,htpfnm')
        text = text.substr(0, maxTextLength)
        textBlock.textContent = text
      }
      

    }
  })
}
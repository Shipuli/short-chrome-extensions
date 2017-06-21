// source: https://stackoverflow.com/a/1026087 
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let button = $('<a>Anki</a>').click((e) => {
  let wanted = $(e.target).siblings().first()
  let kanji = wanted.find('.text').html()
  let furigana = wanted.find('.kanji-2-up')
  furigana = $.map(furigana, (val, i) => {
    return val.innerHTML
  }).join('')

  let meanWrap = $(e.target).parent().next()
  let meaning = capitalize(meanWrap.find('.meaning-meaning').html())
  
  chrome.runtime.sendMessage({type: "jisho_req", card: {front: kanji, back: '(' + furigana + ') ' + meaning}}, (res) => {
    // Do something?? 
  });
}).css({
  'margin-top': '-5px',
  'font-size': '14px'
})

$('.concept_light-wrapper').filter((i, elem) => {
  return ! $(elem).closest('#secondary').length > 0
}).append(button)
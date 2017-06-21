chrome.runtime.sendMessage({type: 'anki_req'}, (res) => {
  if(res.card) {
    if(res.card.front != null) {
      document.getElementById('f0').innerHTML = res.card.front
    }
    if(res.card.back != null) {
      document.getElementById('f1').innerHTML = res.card.back      
    } 
  }
})

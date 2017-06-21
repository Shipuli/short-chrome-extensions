let result;
chrome.runtime.onMessage.addListener(
  (req, sender, res) => {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    switch(req.type) {
      case 'jisho_req':
        res({status: "Ok!"})
        let url = 'https://ankiweb.net/edit/'
        result = req.card
        chrome.tabs.query({}, (tabs) => {
          const re = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
          let found = -1
          for(let i = 0; i < tabs.length; ++i) {
            let info = tabs[i].url.match(re)
            if(info[1] === 'ankiweb.net'){
              found = tabs[i].id
              break
            }
          }
          if(found != -1) {
            chrome.tabs.update(found, {active: true, url: url})
          } else {
            chrome.tabs.create({url: url})
          }
        })
        break
      case 'anki_req':
        res({card: result})
        result = {}
        break
      default:
        console.log("Received message that is not supported!")
    }
  }
)

console.log("Finished loading extension!")
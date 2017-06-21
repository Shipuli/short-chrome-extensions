let result;

chrome.runtime.onMessage.addListener(
  (req, sender, res) => {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    switch(req.type) {
      case 'jisho_req':
        res({status: "Ok!"})
        let url = 'https://ankiweb.net/edit/'
        result = req.card
        chrome.tabs.create({url: url})
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
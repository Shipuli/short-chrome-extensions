const id = "kanji-to-kodansha";
const url = chrome.runtime.getURL("kodansha_parsed.json");
fetch(url)
  .then(res => {
    return res.json();
  })
  .then(data => {
    chrome.contextMenus.create({
      title: 'Search kodansha for "%s"',
      contexts: ["selection"],
      id: id
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
      let kanji = info.selectionText;
      let index = data[kanji];
      chrome.notifications.create({
        type: "basic",
        iconUrl: chrome.runtime.getURL("kanji.jpg"),
        title: "Kanji To Kodansha",
        message: `Index of ${kanji} is ${index}`
      });
    });
  });

chrome.runtime.sendMessage({ type: "anki_req" }, res => {
  console.log(res);
  if (res.card) {
    if (res.card.expression != undefined) {
      if (res.card.expression.length > 1) {
        document.getElementById("deck").innerHTML = "words";
      } else {
        document.getElementById("deck").innerHTML = "kanji";
      }
      document.getElementById("f0").innerHTML = res.card.expression;
    }
    if (res.card.reading != undefined) {
      document.getElementById("f1").innerHTML = res.card.expression + "[" + res.card.reading + "]";
    }
    if (res.card.meaning != undefined) {
      document.getElementById("f2").innerHTML = res.card.meaning;
    }
  }
});

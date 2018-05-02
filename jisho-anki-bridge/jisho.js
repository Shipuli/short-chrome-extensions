// source: https://stackoverflow.com/a/1026087
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let button = $("<a>Anki</a>")
  .click(e => {
    let wanted = $(e.target)
      .siblings()
      .first();
    let kanji = wanted
      .find(".text")
      .html()
      .trim();
    let furigana = wanted.find(".kanji");
    furigana = $.map(furigana, (val, i) => {
      return val.innerHTML;
    }).join("");

    let meanWrap = $(e.target)
      .parent()
      .next();
    let meaning = [];
    meanWrap
      .find(".meaning-meaning")
      .not(":has(span)")
      .each(function(i) {
        meaning.push($(this).text());
      });
    const concat = (x, y) => x.concat(y);
    meaning = meaning
      .map(s => s.split(";"))
      .reduce(concat, [])
      .map(s => capitalize(s.trim()));
    chrome.runtime.sendMessage(
      {
        type: "jisho_req",
        card: { expression: kanji, reading: furigana, meaning: meaning.join(", ") }
      },
      res => {
        // Do something??
      }
    );
  })
  .css({
    "margin-top": "-5px",
    "font-size": "14px"
  });

$(".concept_light-wrapper")
  .filter((i, elem) => {
    return !$(elem).closest("#secondary").length > 0;
  })
  .append(button);

/* search matching */
const urlParams = new URLSearchParams(window.location.search);
const match = urlParams.get("match");
var matched = false;

if (match != null) {
  var instance = new Mark(document.querySelector("body"));
  instance.mark(match, {
    accuracy: "complementary",
    each: (e) => {
      if (!matched) {
        e.setAttribute("id", "matched");
        matched = true;
      }
    },
  });
  if (matched) document.getElementById("matched").scrollIntoView();
}

/* date replacer */
const dates = document.querySelectorAll(".years");
for (let i = 0; i < dates.length; i++) {
  let date = new Date(dates[i].innerText);
  dates[i].innerHTML = calculateYears(date);
}

function calculateYears(date) {
  var dateDifMs = Date.now() - date.getTime();
  var dateDate = new Date(dateDifMs);
  return Math.abs(dateDate.getUTCFullYear() - 1970);
}

/* anchor generator */
var level = 0;
var maxLevel = 5;

document.querySelector("main").innerHTML = document
  .querySelector("main")
  .innerHTML.replace(/<h([\d])>([^<]+)<\/h([\d])>/gi, function (
    str,
    openLevel,
    titleText,
    closeLevel
  ) {
    if (openLevel != closeLevel) {
      c.log(openLevel);
      return str + " - " + openLevel;
    }

    level = parseInt(openLevel);

    var anchor = titleText.toLowerCase().replace(/ /g, "-").replace(/[\\\!\|\"\@\·\#\$\~\%\€\&\¬\/\(\)\=\?\'\¡\¿\€\[\]\`\+\*\^\{\}\´\¨\<\>\,\;\.\:]/gi, '');

    return (
      '<a name="' + anchor + '"></a><h' + openLevel + '>' + titleText + "</h" + closeLevel +">"
    );
  });

/* enable some stuff */
hljs.initHighlightingOnLoad();

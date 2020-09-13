/* search matching */
const urlParams = new URLSearchParams(window.location.search);
const match = urlParams.get("match");
var matched = false;

if (match != null) {
    var instance = new Mark(document.querySelector("body"));
    instance.mark(match, {
        "accuracy": "complementary",
        each: (e) => {
            if(!matched) {
                e.setAttribute('id', 'matched');
                matched = true;
            }
        }
    });
    if(matched) document.getElementById('matched').scrollIntoView();
}

/* date replacer */
const dates = document.querySelectorAll(".to-years");
for (let i = 0; i < dates.length; i++) {
  let date = new Date(dates[i].innerText);
  dates[i].innerHTML = calculateYears(date) + " years.";
}

function calculateYears(date) {
  var dateDifMs = Date.now() - date.getTime();
  var dateDate = new Date(dateDifMs);
  return Math.abs(dateDate.getUTCFullYear() - 1970);
}

/* menu */
function openNav() {
  document.getElementById("ovnav").style.display = "block";
  document.getElementById("ovnav").style.zIndex = "1";
  document.getElementById("ovnav").style.opacity = "1";
  document.getElementById("ovnav").style.width = "50%";
  document.body.style.overflow = 'hidden';

}

function closeNav() {
  document.getElementById("ovnav").style.opacity = "0";
  document.getElementById("ovnav").style.zIndex = "-1";
  document.getElementById("ovnav").style.display = "none";
  document.body.style.overflow = '';
}

/* menu item eventlistener */
function menuItems() {
  var menuItems = document.querySelectorAll(".navmenu ul li a");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', closeNav, false);
  }
}

/* show nav on scroll to top */
function navigation() {
  var scrollpos = 0;
  var nav = document.getElementsByTagName("nav")[0];
  var navClone;
  var navMarginTopPx = "-" + nav.offsetHeight + "px";


  var navScrollTop = nav.scrollTop + nav.offsetHeight

  window.addEventListener('scroll', function(e) {
    if (scrollpos < window.scrollY || window.scrollY == 20) {
      if (typeof navClone != 'undefined') {
        navClone.style.opacity = 0;
        navClone.style.marginTop = navMarginTopPx;
        setTimeout(function() {
          navClone.remove()
        }, 100);
      }
    } else {
      if (window.scrollY > navScrollTop) {
        if (!document.getElementById("nav-clone")) {
          navClone = nav.cloneNode(true);
          navClone.id = "nav-clone";
          navClone.style.marginTop = navMarginTopPx;
          navClone.classList.add("fixed");
          document.body.appendChild(navClone);
        }
        navClone.style.opacity = 1;
        navClone.style.marginTop = 0;
      }
    }
    scrollpos = window.scrollY;
  });
}

/* enable some stuff */
hljs.initHighlightingOnLoad();
menuItems();
navigation();

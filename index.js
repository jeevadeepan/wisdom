//myprofile.js - Javascript for the profile site goes here.

// DOM ready
document.addEventListener("DOMContentLoaded", function (event) {
    var linkTargetPtsArr = [], pages, i,
        fillerHeight = document.getElementsByClassName("featurette-divider")[0].offsetHeight,
        scrollLinkMap = {}, linkTargetPos;
   
    // Add event listener to navigation link clicks - Prevent default action for smooth scrolling.
    document.getElementsByTagName("nav")[0].addEventListener('click', function (event) {
        var targetLink = event.target.nodeName === 'A' ? event.target : event.target.firstChild,
            scrollCounter, scrollTopTo, scrollTimer, step;

        // Exit, if the clicked elemnt is not Anchor.
        if (!targetLink || targetLink.nodeName !== 'A') {
            return;
        }

        // Add Link to window history, to preserve browser history upon back/forward navigation.
        window.history.pushState({}, "", targetLink.href);

        // Top position to scroll to
        scrollTopTo = document.getElementById(targetLink.getAttribute('href').replace(/#/, '')).offsetTop;

        // Scroll counter initialized to current window scroll Y position.
        scrollCounter = window.scrollY;

        // Handle scroll down
        if (scrollCounter < scrollTopTo) {
            step = (scrollTopTo - scrollCounter) / 20;
            scrollTimer = window.setInterval(function () {
                scrollCounter += step;
                window.scrollTo(0, scrollCounter);

                if (scrollCounter >= scrollTopTo) {
                    window.clearInterval(scrollTimer);
                }
            }, 1);
        } else { //Handle scroll up
            step = (scrollCounter - scrollTopTo) / 20;
            scrollTimer = window.setInterval(function () {
                scrollCounter -= step;
                window.scrollTo(0, scrollCounter);

                if (scrollCounter <= scrollTopTo) {
                    window.clearInterval(scrollTimer);
                }
            }, 1);
        }

        // Prevent browser's default action of jumping to new link.
        event.preventDefault();
    }, false);
    
    // Gather position top for all link pages.
    pages = document.getElementsByClassName('featurette');

    for (i = 0; i < pages.length; i++) {
        linkTargetPos = pages[i].offsetTop - fillerHeight;
        linkTargetPtsArr.push(linkTargetPos);

        // Map new page position to actual link id.
        scrollLinkMap[linkTargetPos] = pages[i].id;
    }

    // Add listener to document scroll event to update active navigation link on scroll.
    document.addEventListener('scroll', function (event) {
        var scrollY = window.scrollY, targetLinkPos,
            linkTargetPtsArrLength = linkTargetPtsArr.length;

        // Determine active link position.
        for (i = 0; i < linkTargetPtsArrLength; i++) {
            if (linkTargetPtsArr[i + 1]) {
                if ((scrollY >= linkTargetPtsArr[i]) && (scrollY < linkTargetPtsArr[i + 1])) {
                    targetLinkPos = linkTargetPtsArr[i];
                    break;
                }
            } else {
                targetLinkPos = linkTargetPtsArr[i];
            }
        }
         
        // Remove 'active' class from currently active link.
        document.getElementsByClassName("active")[0].classList.remove("active");

        // Add 'active' class to newly active link.
        document.querySelector("[href=\'#" + scrollLinkMap[targetLinkPos] + "\']").parentNode.classList.add("active");

       // document.querySelector('.active-link').innerHTML = document.querySelector("[href=\'#" + scrollLinkMap[targetLinkPos] + "\']").innerHTML;
    });
});

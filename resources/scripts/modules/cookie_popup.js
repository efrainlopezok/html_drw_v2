function CookiePopup() {
    var self = {
        selector: "#remove-cookie",
        cookieName: "cookieAccept"
    };

    var _init = function () {
        if (document.cookie.indexOf(self.cookieName) == -1) {
            // _showCookiePopup();
        }
        _bind();
    };

    var _bind = function () {
        // Remove cookie
        if (document.querySelector(self.selector)) {
            $(self.selector).on('click', function () {
                _removeCookie();
                location.pathname = "/";
            });
        }
    };

    var _removeCookie = function () {
        document.cookie = self.cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.pathname = "/";
    };

    var _setCookie = function () {
        var d = new Date();
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = self.cookieName + "=1" + ";" + expires + ";path=/";
    };

    var _showCookiePopup = function () {
        var template = "<div class=''>\n"
            + "<h4>We use cookies (or similar) to measure the performance of our Website and to enhance your experience on our Website. By clicking ‘OK’ and continuing to use this Website, you agree to the use of these cookies. For more information and to learn how you can change your cookie settings, please see our <a href='/privacy-notice'>Privacy Notice.</a></h4>\n"
            + "<button class='button'>OK</button>"
            + "</div>";

        var popupEl = document.createElement("div");
        popupEl.classList.add("cookie-popup");
        popupEl.innerHTML = template;
        document.body.appendChild(popupEl);

        var html = document.querySelector("html");
        html.style.overflowY = "hidden";

        $(".cookie-popup .button").on('click', function () {
            popupEl.style.display = "none";
            html.style.overflowY = "initial";
            _setCookie();
        });
    };

    // Initiate
    _init();

    // Return the Object
    return self;
}
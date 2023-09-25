// scripts/main.js

//
//   Global App Variable
//
//////////////////////////////////////////////////////////////////////

var APP = window.APP || {};


//
//   App Initiation
//
//////////////////////////////////////////////////////////////////////

APP.init = function () {
    // Configure Routing
    var routes = {
        '^/?$': APP.indexRoute,
        '^/contact/?$': APP.contactRoute,
        '^/updates/(.*)': APP.updateRoute,
        '^/updates/?$': APP.updatesRoute,
        '^/careers/listings/?$': APP.careerListingsRoute,
        '^/evolve/?$': APP.onCampusRoute
    };

    var mqCheck = function () {
        if (Modernizr.mq('(min-width: 1000px)')) {
            APP.isDesktop = true;
        } else {
            APP.isDesktop = false;
        }
    };
    mqCheck();
    $(window).smartresize(mqCheck);

    new MiniRouter(routes);
    new UpdatesGrid();
    new BlockLink();
    new Slider();
    new MainNav();
    new Alert();
    new CookiePopup();
};


//
//   Routes
//
//////////////////////////////////////////////////////////////////////

APP.indexRoute = function () {
    new FancyHeading();
    new SvgAnimations();
};

APP.updateRoute = function () {
    new BlockBand();

    new Popup({
        selector: '.js-popup--linkedin'
    });

    new Popup({
        selector: '.js-popup--twitter',
        width: 550,
        height: 472
    });

    $('.js-popup--facebook').on('click', function () {
        var href = this.href;
        FB.ui({
            method: 'share',
            href: href
        }, function (response) {
        });
        return false;
    });
};

APP.updatesRoute = function () {
    new AjaxFilter({
        queryBase: 'updates/q?'
    });
};

APP.contactRoute = function () {
    new Clock();
};

APP.onCampusRoute = function () {
    new EventsSlider();
    new VideoHeader();
    new CampusEvents();
    new Slider();
};


//
//   Kickoff
//
//////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    APP.init();
});

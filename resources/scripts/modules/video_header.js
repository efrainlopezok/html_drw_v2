function VideoHeader(options) {
  /*
   USAGE:

   DESCRIPTION
   ActivateVideo
   DeactivateVideo
   AppendIframe


   OPTIONS:
   option                Description [Type]

   */

    //
    //   Private Vars
    //
    //////////////////////////////////////////////////////////////////////

    var self = {
        videoExists: false
    };



    //
    //   Public Vars
    //
    //////////////////////////////////////////////////////////////////////

    self.settings = $.extend({
        selector: '.js-video-head',
        triggerSelector: '#playVideo',
        videoClass: 'l-page-header__video',
        closeClass: 'l-page-header__video-close',
        activeClass: 'video-active'
    }, options);

    //
    //   Private Methods
    //
    //////////////////////////////////////////////////////////////////////

    var _init = function() {

        // TweenMax.selector = 'jQuery';


        self.$header = $(self.settings.selector);
        self.$trigger = self.$header.find(self.settings.triggerSelector);
        self.$body = $('body');

        _bind();
    };

    var _setupGraphic = function(){

        $('.top-coin').hide();

        $('.coin').on('click',function(){
            $('.top-coin').show();
            $('.coin').off().css('cursor','pointer');

            //id of coin we're scaling
            var currentId = this.getAttribute('id');
            var link = '#'+this.getAttribute('id');

            //declare things we are animating
            var t = new TimelineMax({onReverseComplete:_setupGraphic});
            var wc = document.querySelector(link+' .flip circle');
            var pic = document.querySelector(link+' .fade-one');
            var text = document.querySelector(link+' .text');

            //set starting point for each animation with tweenmax
            TweenMax.set('.top-coin',{scale: 1.0, transformOrigin: "50% 50%"});
            TweenMax.set(wc,{scale: 1.0, transformOrigin: "50% 50%"});
            TweenMax.set(pic,{opacity: 1.0, transformOrigin: "50% 50%"});
            TweenMax.set(text,{ transformOrigin: "50% 50%"});

            //update the svg we're applying animations to
            document.querySelector('.top-coin #use').setAttribute('xlink:href',link);

            //animate

            t.to(pic, 0.2, {opacity: 0})
                .to(wc, 0.3, {scale: 3})
                .set(text, {scale:2.8,visibility:'visible', onComplete:function(){

                    $('body').on('click',function(){
                        t.reverse();
                        $('body').off();
                    });
                }});


        });

    };

    var _setup = function() {
        if (!self.videoExists) {
            _appendIframe();
            _prependClose();
            self.videoExists = true;
        }
    };

    var _destroy = function() {
        self.$header.find('.' + self.settings.videoClass).remove();
        self.$header.find('.' + self.settings.closeClass).remove();
        self.videoExists = false;
    };

    var _bind = function() {
        if(navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)){
            var chromeV = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];
            var cV = chromeV.split('.');

            if( parseFloat(cV[0]) > 57 ) {
                //assuming this will be a late enough version of chrome for graphic to work
                _setupGraphic();
            }
            else{
                $('.coin').css('cursor','initial');
            }
        }
        else {
            _setupGraphic();
        }

        self.$trigger.on('click', _activateVideo);
    };

    var _activateVideo = function(evt) {
        evt.preventDefault();
        self.$body.addClass(self.settings.activeClass);
        window.setTimeout(_setup, 500);
    };

    var _deactivateVideo = function(evt) {
        evt.preventDefault();
        self.$body.removeClass(self.settings.activeClass);
        window.setTimeout(_destroy, 500);
    };

    var _prependClose = function() {
        var $closeWrap = $('<div></div>').addClass(self.settings.closeClass);
        var $closeBtn = $('<button></button>').addClass('btn btn--dark');
        $closeBtn.text('Close Video');
        $closeBtn.on('click', _deactivateVideo);

        $closeWrap.append($closeBtn);
        self.$header.prepend($closeWrap);
    };

    var _appendIframe = function() {
        var $container = $('<div></div>').addClass(self.settings.videoClass);
        var href = self.$trigger.attr('href');
        var $iframe = _getEmbedCode(href);

        $container.append($iframe);
        self.$header.append($container);

        if (!APP.isDesktop) {
            self.$body.animate({
                scrollTop: $container.offset().top
            });
        }
    };

    var _getEmbedCode = function(href) {
        var $iframe = $('<iframe width="100%" height="100%" frameborder="0" allowfullscreen></iframe>');
        var data = _getEmbedData(href);
        var queryString = $.param(data.params);
        var src = data.baseUrl + data.id + '?' + queryString;

        $iframe.attr('src', src);

        return $iframe;
    };

    var _getEmbedData = function(href) {
        var segments = href.split('/');
        var videoId = segments[segments.length - 1];

        var data = {
            baseUrl: '',
            id: '',
            params: {}
        };

        if (href.match('/youtube\.com|youtu\.be/')) {

            data = {
                baseUrl: '//www.youtube.com/embed/',
                id: videoId,
                params: {
                    rel: 0,
                    showinfo: 0,
                    autoplay: 1
                }
            };
        } else if (href.match('/vimeo\.com/')) {
            data = {
                baseUrl: '//player.vimeo.com/video/',
                id: videoId,
                params: {
                    autoplay: 1,
                    badge: 0,
                    byline: 0,
                    portrait: 0,
                    title: 0
                }
            };
        }

        return data;
    };

    //
    //   Public Methods
    //
    //////////////////////////////////////////////////////////////////////

    // Initiate
    _init();

    // Return the Object
    return self;
}

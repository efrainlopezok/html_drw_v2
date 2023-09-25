function Slider(options) {

  /*
  USAGE:

  DESCRIPTION

  OPTIONS:
  option                Description [Type]

  */

  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////

  var self = {
  };

  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  self.settings = $.extend({
    selector: '.js-slider',
    flickityOptions: {
      prevNextButtons: true,
      cellSelector: '.js-slider__slide',
      cellAlign: 'left',
      contain: true,
      setGallerySize: true,
      autoPlay: 20000,
    }
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    // If we're on desktop, don't set the gallery size
    if(APP.isDesktop) {
      self.settings.flickityOptions.setGallerySize = false;
    }

    _initFlickity();
    _bind();
  };

  var _initFlickity = function() {
    self.$slider = $(self.settings.selector).flickity( self.settings.flickityOptions );
  };

  var _bind = function() {
    $(window).smartresize(function() {
      if(APP.isDesktop) {
        // If we switch to non-mobile we destroy the slider
        self.$slider.flickity('destroy');
        // Switch the setting
        self.settings.flickityOptions.setGallerySize = false;
        // and reinit
        _initFlickity();
      } else {
        // If we switch to non-mobile we destroy the slider
        self.$slider.flickity('destroy');
        // Switch the setting
        self.settings.flickityOptions.setGallerySize = true;
        // and reinit
        _initFlickity();
      }
    });
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

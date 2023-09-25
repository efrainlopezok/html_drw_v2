function BlockBand(options) {
  
  /*
  USAGE:
  
  Creates a full-width image band. Ideally we could do this in CSS but in order to keep the matrix blocks modular I'm falling back
  to a javascript solution.
  
  OPTIONS:
  bandSelector                Selector for image container [String / jQuery Selector]

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
    selector: '.js-full-width',
    wrapperClass: 'full-width-wrapper',
    fullWidthClass: 'u-full-width'
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    self.$el = $(self.settings.selector);
    self.$el.wrap('<div class="' + self.settings.wrapperClass + '"></div>');
    self.$wrapper = $('.' + self.settings.wrapperClass);

    self.$el.addClass(self.settings.fullWidthClass);
    _bind();
  };

  var _bind = function() {
    $(window).smartresize( _setSpacer );
    imagesLoaded(self.settings.selector, _setSpacer );
  };

  var _setSpacer = function() {
    var spacerHeight = self.$el.outerHeight();
    self.$wrapper.outerHeight(spacerHeight);
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
 
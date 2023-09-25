function Popup(options) {
  
  /*
  USAGE:
  
  Creates a little popup window. Mostly used for social share links since they all need one
  but no one provides their own.
  
  OPTIONS:
  selector                Selector to trigger the window [String / jQuery Selector]
  width                   Width of the window [Int]
  height                  Height of the window [Int]

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
    selector: '.js-popup',
    width: 520,
    height: 570
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    _bind();
  };

  var _bind = function() {
    $(self.settings.selector).on('click', _openWindow );
  };

  var _openWindow = function($target) {
    var left   = ($(window).width()  - self.settings.width)  / 2,
        top    = ($(window).height() - self.settings.height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + self.settings.width  +
                 ',height=' + self.settings.height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(url, 'linkedin', opts);
   
    return false;
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
 
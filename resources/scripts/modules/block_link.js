function BlockLink(options) {
  
  /*
  USAGE:
  
  Turns any block element into a link.
  
  OPTIONS:

  */
 
  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////

  var self = {
    selector: '.js-block-link'
  };


  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  self.settings = $.extend({

  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    $(self.selector).on('hover', function() {
      $(this).css('cursor', 'pointer');
    }, function() {
      $(this).css('cursor', 'auto');
    });
    _bind();
  };

  var _bind = function() {
    $(self.selector).on('click', _goToLink);
  };

  var _goToLink = function() {
    document.location.href = $(this).data('href');
  };

  // Initiate
  _init();

  // Return the Object
  return self;
}
 
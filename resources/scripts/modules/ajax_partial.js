function AjaxPartial(options) {
  
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
    appendToSelector: '.js-ajax__wrapper',
    loaderSelector: '.js-loader',
    failsafeSelector: '.ajax-failsafe'
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    self.requestUrl = $(self.settings.failsafeSelector).attr('href');
    _removeFailsafe();
    _getPartial();
  };

  var _getPartial = function() {
    $.ajax({
      method: "GET",
      url: self.requestUrl,
      dataType: 'html',
      success: function(data, textStatus, jqxhr) {
        if(textStatus == 'success') {
          _removeLoader();
          _prependTemplate(data);
        }
      },
      error: function(jqxhr, textStatus, errorThrown) {
        // TODO: Handle errors better
      }
    });
  };

  var _removeLoader = function() {
    var $loader = $(self.settings.appendToSelector).find(self.settings.loaderSelector);
    TweenLite.to($loader, 1, { autoAlpha: 0, height: 0, padding: 0, margin: 0 });
  };

  var _prependTemplate = function(data) {
    $(data).appendTo(self.settings.appendToSelector);
  };

  var _removeFailsafe = function() {
    $(self.settings.failsafeSelector).remove();
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
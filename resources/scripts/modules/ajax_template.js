function AjaxTemplate(options) {
  
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
    nextPage: 0,
  };


  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  self.settings = $.extend({
    appendToSelector: '.js-listings__wrapper',
    loadingIndicatorSelector: '.js-listings__indicator',
    moreSelector: '.js-ajax__more',
    moreButtonMarkup: '<a href="#" class="btn btn--large js-listings__more">More Listings</a>'
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    self.$moreButton = $(self.settings.moreSelector);
    self.moreText = self.$moreButton.text();
    self.$moreButton.css('opacity', 0);
    self.requestUrl = '/careers/listings/p/';
    _getTemplate(0);
    _bind();
  };

  var _getTemplate = function(page) {
    $.ajax({
      method: "GET",
      url: self.requestUrl + page,
      dataType: 'html',
      success: _successHandler,
      error: function(jqxhr, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  };

  var _bind = function() {
    $(self.settings.moreSelector).on('click', _clickHandler);
  };

  var _clickHandler = function(event) {
    event.preventDefault();
    $(event.target).addClass('is-loading');
    $(event.target).text('Loading ...');
    _getTemplate(self.nextPage);
  };

  var _removeLoader = function() {
    TweenLite.to(self.settings.loadingIndicatorSelector, 1, { autoAlpha: 0, height: 0, padding: 0, margin: 0 });
  };

  var _insertData = function(data) {
    var html = $.parseHTML(data);
    $(html).appendTo(self.settings.appendToSelector);
  };

  var _successHandler = function(data, textStatus, jqxhr) {
    if($.trim(data)) {
      if(textStatus == 'success') {
        _removeLoader();
        _insertData(data);
        self.$moreButton.css('opacity', 1);
        self.$moreButton.removeClass('is-loading');
        self.$moreButton.html(self.moreText);
        self.nextPage++;
      }
    } else {
      self.$moreButton.removeClass('is-loading').addClass('is-inactive');
      self.$moreButton.html('No more items available');
    }
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
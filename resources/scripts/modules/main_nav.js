function MainNav(options) {
  
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
    navOpen: false
  };


  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  self.settings = $.extend({
    toggleSelector: '.js-nav-toggle',
    navSelector: '.js-nav',
    activeClass: 'is-active'
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    self.$trigger = $(self.settings.toggleSelector);
    self.$nav = $(self.settings.navSelector);

    _bind();
  };

  var _bind = function() {
    self.$trigger.on('click', _clickHandler);
  };

  var _clickHandler = function(event) {
    event.preventDefault();
    if(self.navOpen) {
      _closeNav();
    } else {
      _openNav();
    }
  };

  var _openNav = function() {
    self.$nav.addClass(self.settings.activeClass);
    self.navOpen = true;
  };

  var _closeNav = function() {
    self.$nav.removeClass(self.settings.activeClass);
    self.navOpen = false;
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
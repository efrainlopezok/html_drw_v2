function Clock(options) {
  
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
    clockSelector: '.js-clock',
    minuteHandSelector: '#minutes',
    secondHandSelector: '#seconds',
    hourHandSelector: '#hours',
    animatingClass: 'animate'
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    self.$clocks = $(self.settings.clockSelector);

    $.each(self.$clocks, function() {
      _setClock( $(this) );
    });
  };

  var _setClock = function($clock) {
    var currentTime = $clock.data('time').split(':');
    currentTime[0] = parseInt(currentTime[0]) + (currentTime[1] / 60);
    var hands = [
      $clock.find(self.settings.hourHandSelector), 
      $clock.find(self.settings.minuteHandSelector),
      $clock.find(self.settings.secondHandSelector)
    ];

    for(var i = 0; i < hands.length; i ++) {
      var divisor = (i === 0) ? 12 : 60;
      TweenMax.set(hands[i], {rotation: (currentTime[i] / divisor) * 360, transformOrigin: "50% 100%" });
    }

    _startAnimation(hands);
  };

  var _startAnimation = function(hands) {
    // Seconds
    TweenMax.to(hands[2], 60, {rotation: '+=360', ease: Linear.easeNone}).repeat(120);

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
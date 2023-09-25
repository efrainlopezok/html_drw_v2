function SvgAnimations(options) {
  
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
    tradingSelector: '#illo-trading',
    technologySelector: '#illo-technology',
    realEstateSelector: '#illo-real-estate',
    careersSelector: '#illo-careers'
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    // Init our hover triggers
    self.$trading = $(self.settings.tradingSelector);
    self.$technology = $(self.settings.technologySelector);
    self.$realEstate = $(self.settings.realEstateSelector);
    self.$careers = $(self.settings.careersSelector);

    // Hide all the illustrations
    _hideTrading();
    _hideTechnology();
    _hideRealEstate();
    _hideCareers();

    self.waypoint = new Waypoint({
      element: $('.l-section--icons')[0],
      handler: _initialAnimation,
      offset: '75%'
    });

    // Set up the timelines
    self.tradingAnimation = new TimelineLite();
    self.techAnimation = new TimelineLite();
    self.realEstateAnimation = new TimelineLite();
    self.careersAnimation = new TimelineLite();

    // Bind the hover events
    _bind();
  };

  // Bind
  //////////////////////////////////////////////////////////////////////

  var _bind = function() {
    self.$trading.mouseenter(_replayTrading);
    self.$technology.mouseenter(_replayTechnology);
    self.$realEstate.mouseenter(_replayRealEstate);
    self.$careers.mouseenter(_replayCareers);
  };

  // Hide illustrations
  //////////////////////////////////////////////////////////////////////

  var _hideItems = function(items) {
    for (var i = 0; i < items.length; i++) {
      var options = {};
      options.strokeDasharray = items[i].pathLen + 'px';
      options.strokeDashoffset = items[i].pathLen;

      TweenLite.set(items[i].selector, options);
    }
  };

  var _hideTrading = function() {
    TweenLite.set(['#start', '#end'], { opacity: 0, scale: 0, ease: Power2.easeInOut, transformOrigin: '50% 50%' });
    _hideItems([
      { selector: '#line', pathLen: 232 }
    ]);
  };

  var _hideTechnology = function() {
    TweenLite.set(['#greenEnd', '#greyEnd', '#blueEnd'], { opacity: 0, scale: 0, transformOrigin: '50% 50%' });

    _hideItems([
      { selector: '#blueLine', pathLen: 132 },
      { selector: '#greyLine', pathLen: 60 },
      { selector: '#greenLine', pathLen: 130 },
    ]);
  };

  var _hideRealEstate = function() {
    _hideItems([
      { selector: '#building', pathLen: 160 },
      { selector: '#cloud1', pathLen: 48 },
      { selector: '#cloud2', pathLen: 36 },
      { selector: '#ground', pathLen: 66 },
      { selector: '#flagPole', pathLen: 12 },
      { selector: '#flag', pathLen: 14 }
    ]);
  };

  var _hideCareers = function() {
    TweenLite.set(['#pencilTip'], { opacity: 0, scale: 0, transformOrigin: '50% 50%'});
    _hideItems([
      { selector: '#outline', pathLen: 330 },
      { selector: '#firstName', pathLen: 20 },
      { selector: '#lastName', pathLen: 20 },
      { selector: '#logo', pathLen: 11 },
      { selector: '#address1', pathLen: 60 },
      { selector: '#address2', pathLen: 40 },
      { selector: '#pencilEraser', pathLen: 6 },
      { selector: '#pencilBarrel', pathLen: 60 },
    ]);
  };

  // Initial Animation
  //////////////////////////////////////////////////////////////////////

  var _initialAnimation = function() {
    var tl = new TimelineLite();
    tl.add([
      _animateInTrading,
      _animateInTechnology,
      _animateInRealEstate, 
      _animateInCareers
    ], "0", "sequence", 0.5);
    tl.play();
  };

  // Animations
  // 
  //////////////////////////////////////////////////////////////////////

  // Trading
  // -------------------------------------------------------------------
  var _animateInTrading = function() {
    var dotOpts = { opacity: 1, scale: 1, ease: Power2.easeInOut };

    self.tradingAnimation.to('#start', 0.25, dotOpts);
    self.tradingAnimation.to('#line', 1, { strokeDashoffset: 0 }, 0.15);
    self.tradingAnimation.to('#end', 0.25, dotOpts, 0.35);
    self.tradingAnimation.play();
  };

  var _replayTrading = function() {
    self.tradingAnimation.restart();
  };

  // Technology
  // -------------------------------------------------------------------
  var _animateInTechnology = function() {
    var endOpts = {
      opacity: 1,
      scale: 1,
      ease: Power2.easeInOut,
    };
    var lineOpts = {
      strokeDashoffset: 0
    };

    self.techAnimation.to('#greyLine', 0.25, { strokeDashoffset: 120 });
    self.techAnimation.to('#greyEnd', 0.25, endOpts, 0.15);
    self.techAnimation.to('#blueLine', 0.5, lineOpts, 0.2);
    self.techAnimation.to('#blueEnd', 0.25, endOpts, 0.4);
    self.techAnimation.to('#greenLine', 0.5, { strokeDashoffset: 260 }, 0.3);
    self.techAnimation.to('#greenEnd', 0.25, endOpts, 0.5);
    self.techAnimation.play();
  };

  var _replayTechnology = function() {
    self.techAnimation.restart();
  };

  // Real Estate
  // -------------------------------------------------------------------
  var _animateInRealEstate = function() {
    var strokeOpts = { strokeDashoffset: 0 };
    self.realEstateAnimation.to('#building', 1, { strokeDashoffset: 0, ease: Power2.easeInOut });
    self.realEstateAnimation.to('#flagPole', 0.25, { strokeDashoffset: 24 }, 0.8);
    self.realEstateAnimation.to('#flag', 0.25, strokeOpts, 0.85);
    self.realEstateAnimation.to('#ground', 0.45, strokeOpts, 0.3);
    self.realEstateAnimation.to('#cloud2', 0.25, strokeOpts, 0.5);
    self.realEstateAnimation.to('#cloud1', 0.25, strokeOpts, 0.6);
    self.realEstateAnimation.play();
  };

  var _replayRealEstate = function() {
    self.realEstateAnimation.restart();
  };

  // Careers
  // -------------------------------------------------------------------
  var _animateInCareers = function() {
    var strokeOpts = { strokeDashoffset: 0 };
    self.careersAnimation.to('#outline', 1, { strokeDashoffset: 0, ease: Power2.easeInOut });
    self.careersAnimation.to('#firstName', 0.25, strokeOpts, 0.5);
    self.careersAnimation.to('#lastName', 0.25, strokeOpts, 0.6);
    self.careersAnimation.to('#logo', 0.25, strokeOpts, 0.7);
    self.careersAnimation.to('#address1', 0.25, strokeOpts, 0.55);
    self.careersAnimation.to('#address2', 0.25, strokeOpts, 0.65);
    self.careersAnimation.to('#pencilEraser', 0.25, strokeOpts, 0.75);
    self.careersAnimation.to('#pencilBarrel', 0.25, strokeOpts, 0.8);
    self.careersAnimation.to('#pencilTip', 0.25, { opacity: 1, scale: 1 }, 0.9);
    self.careersAnimation.play();
  };

  var _replayCareers = function() {
    self.careersAnimation.restart();
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
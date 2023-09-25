function EventsSlider(options) {
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
    selector: '.js-campus-events',
    filterSelector: '#campusSelect',
    hiddenClass: 'is-hidden',
    selectedClass: 'is-selected',
    flickityOptions: {
      prevNextButtons: true,
      cellSelector: '.js-campus-events__slide:not(.is-hidden)',
      cellAlign: 'center',
      pageDots: false,
    }
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    self.$dots = $('.js-campus-events__dots');
    self.$filter = $(self.settings.filterSelector);
    _initFlickity();
    _bind();
  };

  var _initFlickity = function() {
    self.$slider = $(self.settings.selector).flickity(self.settings.flickityOptions);
  };

  var _bind = function() {
    self.$dots.on('click', 'li', _changeToSlide);
    self.$slider.on('cellSelect', _slideChanged);
    self.$filter.on('change', _filterChange);
  };

  var _filterChange = function(evt) {
    var $this = $(this);
    self.filter = $this.val();

    _filterItems(self.filter);
  };

  var _filterItems = function(value) {
    var $allItems = $('[data-campus]');
    // If a value is present filter things
    if (value && value !== '#notOnCampus') {
      $allItems.addClass(self.settings.hiddenClass);
      $('[data-campus="' + value + '"]').removeClass(self.settings.hiddenClass);

    // otherwise show everything
    } else if (value == '#notOnCampus') {
      var target = $(value);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, "linear");
        return false;
      }
    } else {
      $allItems.removeClass(self.settings.hiddenClass);
    }

    // after we filter things we have to wake up flickity
    self.$slider.flickity('reloadCells');
    self.$slider.flickity('select', 0);
  };

  var _changeToSlide = function(evt) {
    evt.preventDefault();
    var $target = $(this);
    self.$slider.flickity('select', $target.index());
  };

  var _slideChanged = function() {
    var index = self.$slider.data('flickity').selectedIndex;
    _selectSlide(index);
  };

  var _selectSlide = function(index) {
    var $allDots = self.$dots.find('li');
    var $activeDots = $allDots.not('.is-hidden');

    $allDots.removeClass(self.settings.selectedClass);
    $activeDots.eq(index).addClass(self.settings.selectedClass);
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

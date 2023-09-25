function AjaxFilter(options) {
  
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
    currentFilters: {},
  };


  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////

  self.settings = $.extend({
    filterSelector: '.js-filter',
    filterList: '.js-filter__list',
    activeClass: 'is-active',
    queryBase: ''
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    _setUrl();
    _bind();
  };

  var _bind = function() {
    $(self.settings.filterList).on('click', 'li', _filterListHandler );
  };

  var _getUrl = function() {
    var pathArray = location.href.split('/');
    var protocol = pathArray[0];
    var host = pathArray[2];
    
    return protocol + '//' + host + '/' + self.settings.queryBase;
  };

  var _setUrl = function() {
    self.url = _getUrl();
  };

  var _filterListHandler = function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var filterValue = $target.attr('data-filter-value');
    var filterType = $target.attr('data-filter-type');

    // If we selected the all filter
    if( filterValue === 'all' ) {
      // Then remove the activeClass from everything
      $(self.settings.filterList).find('li').removeClass(self.settings.activeClass);
    } else {
      $('[data-filter-value="all"]').removeClass(self.settings.activeClass);
    }

    _updateFilters(filterValue, filterType);
  };

  var _updateFilters = function(value, type) {
    $('[data-filter-value="' + value + '"]').toggleClass(self.settings.activeClass);

    if (value === 'all') {
      self.currentFilters = {};
    } else {
      if (self.currentFilters[type]) {
        var index = self.currentFilters[type].indexOf(value);
        if ( index > -1) {
          self.currentFilters[type].splice(index, 1);
        } else {
          self.currentFilters[type].push(value);
        }
      } else {
        self.currentFilters[type] = [value];
      }
    }

    var url = self.url + $.param({
      'filters': self.currentFilters
    });
    
    _redirectTo(url);
  };

  var _redirectTo = function(url) {
    window.location.href = url;
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
function UpdatesGrid(options) {
  
  /*
  USAGE:
  
  Responsible for a the functionality related to the updates grid. As we go
  this might be able to be split out into more re-useable modules, but for now (07.08.2015)
  I'm going to wait until we need something to split it out.
  
  OPTIONS:
  gridSelector                Selector for grid container [String / jQuery Selector]
  isotopeOptions              Options for isotope (http://isotope.metafizzy.co/options.html) [Object]
  activeClass                 Class applied to grid after layout is complete [String]

  */
 
  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////
 
  var self = {
    ajax: {
      page: 1
    }
  };
 
 
  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////
 
  self.settings = $.extend({
    gridSelector: '.js-updates-grid',
    activeClass: 'is-active',
    errorClass: 'has-error',
    moreSelector: '#load-more',
    isotopeOptions: {
      itemSelector: '.l-masonry-grid__item',
      percentPosition: true,
      masonry: {
        columnWidth: '.l-masonry-grid__item--sizer',  
        gutter: 32
      },
      hiddenStyle: {
        opacity: 0,
        transform: "scale(0.9)"
      }, 
      visibleStyle: {
        opacity: 1,
        transform: "scale(1)"
      },
      isInitLayout: false
    }
  }, options);
 
 
  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////
 
  var _init = function() {
    self.$moreButton = $(self.settings.moreSelector);
    self.moreText = self.$moreButton.text();
    _initGrid();
    _setRequestUrl(self.ajax.page);
  };

  var _parseUrl = function() {
    var url = {};
    var pathArray = location.href.split('/');
    url.protocol = pathArray[0];
    url.firstSegment = pathArray[3];
    url.host = pathArray[2];
    url.lastSegment = pathArray[pathArray.length-1];
    url.query = window.location.search;

    return url;
  };

  var _setRequestUrl = function(pageNum) {
    var url = window.location.href.replace('#', '');
    if (url.indexOf('/blog?') !== -1){
      url = url.slice(0,url.indexOf('?'));
    }
    var seperator = (url.indexOf('?') === -1) ? '/q?' : '&';

    var newParam = seperator + "page=" + pageNum;
    if (window.entryType){
      newParam = newParam + '&type='+window.entryType;
    }
    if (window.entryDateFilter){
      newParam = newParam + '&filters%5Bdate%5D='+window.entryDateFilter;
    }
    self.requestUrl = url.replace(newParam, "") + newParam;
  };

  var _bindGrid = function() {
    $(self.settings.moreSelector).on('click', function( event ) {
      event.preventDefault();
      self.ajax.page++;
      _loadUpdates();
    });

    var imgLoad = imagesLoaded(self.settings.gridSelector);
    imgLoad.on('always', self.layoutGrid);
  };

  var _initGrid = function() {
    self.$grid = $(self.settings.gridSelector).isotope(self.settings.isotopeOptions);
    _bindGrid();
  };

  var _loadUpdates = function() {
    _setRequestUrl(self.ajax.page);
    $.ajax({
      method: "GET",
      url: self.requestUrl,
      dataType: 'html',
      beforeSend: function() {
        $(self.settings.moreSelector).html('Loading ...').addClass('is-loading');
      },
      success: function(data, textStatus, jqxhr) {
        if($.trim(data)) {
          if(textStatus == 'success') {
            var html = $.parseHTML(data);
            self.$moreButton.css('opacity', 1);
            self.$moreButton.removeClass('is-loading');
            self.$moreButton.html(self.moreText);

            self.$grid.append(html).imagesLoaded(function() {
              self.$grid.isotope('appended', html);
            });
          }
        } else {
          self.$moreButton.removeClass('is-loading').addClass('is-inactive');
          self.$moreButton.html('No more items available');
        }
      },
      error: function() {
        self.$moreButton.html("Uh oh, we couldn't load more posts. Please try again later");
        self.$moreButton.addClass(self.settings.errorClass);
      },
      complete: function() {
          // Increase the limit
          self.ajax.offset += self.ajax.pageCount;

        //check if there is more to load
          page = self.ajax.page +1;
          _setRequestUrl(page);
          $.ajax({
            method: "GET",
              url: self.requestUrl,
              dataType: 'html',
              success: function(data, textStatus, jqxhr) {
                if($.trim(data)){
                    //if there is more to load
                    self.$moreButton.html('Load More').removeClass('is-loading');
                }
                else {
                  //hide button if there is nothing else to load
                  self.$moreButton.removeClass('is-loading').addClass('is-inactive');
                }
              }
          });
      }
    });
  };

  //
  //   Public Methods
  //
  //////////////////////////////////////////////////////////////////////

  self.layoutGrid = function() {
    self.$grid.isotope('layout');
  };
  
  // Initiate
  _init();
 
  // Return the Object
  return self;
}
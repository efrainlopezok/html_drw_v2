function FancyHeading(options) {
  
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
    selector: '.js-fancy-heading',
    classes: [
      'u-color--reverse', 
      'u-color--bright-teal',
      'u-color--reverse',
      'u-color--pale-turquoise'
    ]
  }, options);

  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////

  var _init = function() {
    var string = $(self.settings.selector).text();
    $(self.settings.selector).empty();
    _wrapWords(string, self.settings.classes);
  };

  var _wrapWords = function(string, classes) {
    var words = string.split(' ');
    var classIndex = 0;
    
    $.each(words, function(index, value) {
      var el = '<span class="' + classes[classIndex] + '">' + value + '</span> ';
      $(self.settings.selector).append( el );

      classIndex = classIndex + 1 > (classes.length - 1) ? 0 : classIndex + 1;
    });
  };

  // Initiate
  _init();

  // Return the Object
  return self;
}
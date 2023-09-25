function Alert(options) {
    // If user closes the alert popup, make ajax call to set cookie that will keep alert closed for 24hrs

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
        container: '.js-alert',
        close: '.js-alert .close'
    }, options);

    //
    //   Private Methods
    //
    //////////////////////////////////////////////////////////////////////

    var _init = function() {
        _bind();
    };

    var _bind = function() {
        $(self.settings.close).on('click', _hideAlert );
    };

    var _hideAlert = function($target) {
        $(self.settings.container).slideToggle();
        $.ajax({
            method: "GET",
            url: '//'+window.location.hostname +'/alert',
            dataType: 'html',
            error: function(jqxhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        return false;
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

function CampusEvents(options) {

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
        selector: '#campusMap',
        dSelector: '.campus-map__dialog',
        dCloser: '.campus-map__dialog--close',
        svg: {
            width : null,
            height : null
        },
        campusList: {},
        noEventMsg: 'No event scheduled at this time',
        lastC: null
}, options);

    //
    //   Private Methods
    //
    //////////////////////////////////////////////////////////////////////

    var _init = function() {
        //init
        //get width and height of svg
        var viewBox = d3.select('#campusMap').attr('viewBox').split(' ');
        self.settings.svg.width = parseFloat(viewBox[2]);
        self.settings.svg.height = parseFloat(viewBox[3]);

        //for IE, set height for svg
        if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)){
            var w = $(window).width();
            var h = (w * self.settings.svg.height) / self.settings.svg.width;
            $('#campusMap').css('max-height',h);
        }


        //if there are multiple events for a school, add arrow to first one
        //
        var dialogs = $('.campus-map__dialog[data-campus-handle]');
        //
        //are there multiple events?
        if( dialogs && dialogs.length > 1){
            //for each dialog with event info
            dialogs.each(function(){
               var current = $(this).attr('data-campus-handle');
               //check against list of all dialogs with event info to see if one exists with same campus handle
               dialogs.each(function(){
                  if( current === $(this).attr('data-campus-handle')){
                      //since there are multiple dialogs with this campus handle, add the arrow nav to the first one
                    $('.campus-map__dialog[data-campus-handle='+current+']').first().find('.dialog__nav--right').addClass('dialog__nav--show');
                  }
               });
            });
        }


        //ready dialogs
        d3.selectAll('svg .campus').on('click', function() {
            _dialog(d3.select(this),0);
        });

        //close dialog
        $(self.settings.dCloser).click(function(){
            _dialogClose();
        });

        _dialogNav();



    };

    var _dialog = function(thisC, x){
            //if dialogs are open, close them
            _dialogClose();

            //d is for dialog
            //c is for circle

            var campus = thisC.attr('data-handle');
            var d = $('.campus-map__dialog[data-campus-handle='+campus+']').eq(x);

            //show nav buttons in d
            //show right nav
            if( $('.campus-map__dialog[data-campus-handle='+campus+']').length > (x + 1) ){
                d.find('.dialog__nav--right').addClass('dialog__nav--show');
            }
            else {
                d.find('.dialog__nav--right').removeClass('dialog__nav--show');
            }
            //show left nav
            if( 0 < x ){
                d.find('.dialog__nav--left').addClass('dialog__nav--show');
            }
            else {
                d.find('.dialog__nav--left').removeClass('dialog__nav--show');
            }

            if(d.length < 1){
                //if no matching dialog was found
                d = $('.campus-map--no-event');
            }


            var c =thisC.select('circle');
            //in relation to c, where do we want the dialog
            var cX = (parseFloat(c.attr('cx')) + parseFloat(c.attr('r'))) + 20;

            //how many svg pts wide is the dialog
            var pts = (self.settings.svg.width / window.innerWidth ).toFixed(3) * $(self.settings.dSelector).outerWidth();
            //if dialog is wider than remaining right space, align left
            if((self.settings.svg.width - cX) < pts){
                cX = (parseFloat(c.attr('cx')) - parseFloat(c.attr('r'))) - (20 + pts);
            }

            //convert d x and y coordinates to % for responsiveness
            var dX = (cX / self.settings.svg.width).toFixed(3);
            var dY = (c.attr('cy') / self.settings.svg.height).toFixed(3);

            //c fill
            // var color = c.style('stroke');

            //set coordinates via top and left positions
            d.css({top:(dY*100)+'%',left:(dX*100)+'%',display:'block'});
            //change colors on c
            // d.show();
            // c.style('fill',color).style('stroke','#ffffff');
            //save to revert when dialog closes
            self.settings.lastC = c;
    };

    var _dialogClose = function(){
        $(self.settings.dSelector).hide();
        //reset circle fill
        // if(self.settings.lastC){
        //     var color = self.settings.lastC.style('fill');
        //     self.settings.lastC.style('stroke',color).style('fill','#ffffff');
        // }
    };

    var _dialogNav = function(){

        $('.dialog__nav').click(function(){

            //get the campus
            var h = $(this).parent().attr('data-campus-handle');

            //get the position of the current dialog in the list of dialogs for that campus
            thisI = $('.campus-map__dialog[data-campus-handle='+h+']').index($(this).parent());
            var direction = $(this).hasClass('dialog__nav--left') ? parseInt(thisI) - 1 : parseInt(thisI) + 1;

            _dialog(d3.select('svg .campus[data-handle='+h+']'),direction);


        });


    };

    // Initiate
    _init();

    // Return the Object
    return self;
}
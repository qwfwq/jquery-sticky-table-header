// This plugin changes a tables css and html
// so that the table's header is sticky on scroll
// It is derivitive of the below jsFiddle by D-Pixie
// https://jsfiddle.net/dPixie/byB9d/3/light/
// But unlike the fiddle this allows you to keep your
// HTML sheet clean and abstract the details by applying the DOM changes, styling
// dynamically after the page loads.
// Only works on Modern browsers so no IE <= 9
(function ($) {
    $.fn.stickyTable = function( options ) {
        // optional arguments
        options = options || {};
        var height = options.height || null;

        // Class constants
        var fakeThClass = 'fake-table-header';
        var scrollWrapperClass = 'scroll-wrapper';

        // Temporarily hold whatever was here so we can
        // add it back just in case another plugin is called stealStyles
        var stealStylesPlaceholder = $.fn.stealStyles;

        // Helper function for moving styles from one element to another
        $.fn.stealStyles = function ( $victim, styles ) {
            // Bind self because js
            var self = this;

            $.each(styles, function ( i, style ) {
                self.css( style, $victim.css( style ) );
            });

            return this;
        };

        // Helper function for measuring the browser's scroll bar width
        var getScrollBarWidth = function () {
            var $measure;
            var measureClass = "measure-class";
            var scrollBarWidth;

            $("<div>")
                .addClass( measureClass )
                .css( "position", "absolute" )
                .css( "top", -99999 )
                .css( 'overflow', 'scroll' )
                .width( 100 )
                .height( 100 )
                .appendTo( "body" );

            $measure = $("." + measureClass);

            scrollBarWidth = $measure[0].offsetWidth - $measure[0].clientWidth;
            $measure.remove();

            return scrollBarWidth;
        };

        var marginOffset;
        // We need to account for the scroll bar
        var scrollBarWidth;
        var $fakeThs;
        var $thead = this.find( "thead" );
        var $thColumns = $thead.find( "th" );

        var $fixedWrapper = $( "<div>")
            .css( "position", "relative" )
            .css( "display", "inline-block");

        // The fake header allows makes it so that the color from the header
        // Doesn't affect the table in the case where the tds do not have a
        // background color
        var $fakeheader = $( "<div>" )
            .stealStyles( $thead, ['background-color', 'height'] );

        var $scrollWrapper = $( "<div>" )
            .addClass( scrollWrapperClass )
            .css( "overflow-y", "auto" )
            // Make the wrapper shrink to fit the containing div
            .css( "display", "inline-block" )
            .css( "height", height )
            // Display inline will get the width of the containing div without
            // accounting for the scrollbar so we add the scroll width as padding here
            .css("padding-right", getScrollBarWidth());

        $( this ).wrap( $fixedWrapper );
        $( this ).before( $fakeheader );
        $( this ).wrap( $scrollWrapper );

        $thColumns.each(function ( i, thColumn ) {
            var $thColumn = $( thColumn );

            $( "<div>" )
                .text( $thColumn.text() )
                .addClass( fakeThClass )
                .stealStyles( $thColumn,
                    ['color',
                    // Get each padding individually, IE
                    // returns "" if we do a straight call for 'padding'
                    'padding-top',
                    'padding-left',
                    'padding-right',
                    'padding-bottom',
                    'height',
                    'line-height']
                )
                .appendTo( $thColumn );
        });

        $fakeThs = $("." + fakeThClass);

        marginOffset = parseInt( $fakeThs.css( "padding-left" ), 10 );

        $fakeThs
            .css( 'position', 'absolute' )
            .css('margin-left', -marginOffset )
            .css( 'top', 0 );

        $thead.css( 'background', 'transparent' );

        $thColumns
            .css( 'background-color', 'transparent' )
            .css( 'height', 0 )
            .css( 'line-height', 0 )
            .css( 'padding-top', 0 )
            .css( 'padding-bottom', 0 )
            .css( 'border-color', 'transparent' );

        // Put whatever was called stealStyles back in place should it matter
        $.fn.stealStyles = stealStylesPlaceholder;

        return this;
    };
})( jQuery );
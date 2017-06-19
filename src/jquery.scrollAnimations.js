;
(function ($, window, document, undefined) {

    var pluginName = "scrollAnimations";

    /**
     * ScrollAnimations - applies an animate class to elements when scrolled into the viewport
     *
     * @author Westley Mon <wmarchment@mindgruve.com>
     * @version 1.0.1
     *
     * @param {jQuery} element jQuery instance of selected elements
     * @param {ScrollAnimationsOptions} options Custom options will be merged with the defaults
     * @constructor
     */
    function ScrollAnimations(element, options) {
        if (element) {
            this.element = element;
            this.animationElements = [];
            this.triggerPoint = null;
            this.scrollIntervalID = null;
            this.lastScrollPos = -1;
            this.timer = null;

            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            this.options = $.extend( {}, options );
            this._name = pluginName;
            window.onload = this.init();
        }
    }

    ScrollAnimations.prototype = {

        init: function() {
            var _this = this;

            var $els = $(this.element);

            var containers = $els.filter('[data-animation-container]');
            var items = $els.not(containers);

            //set single items
            _this.setup(items);

            // setup animation sets
            containers.each(function() {
                _this.setup($(this));
            });

            //setInterval(_this.updatePage(_this), 10);
            this.scrollIntervalID = setInterval(function () {
                _this.updatePage(_this);
            }, 10);

        },

        resize: function () {
            var _this = this;
            clearTimeout(_this.timer);

            _this.timer = setTimeout(function () {
                this.triggerPoint = window.innerHeight * 0.8;
            }, 50)

        },

        setup: function(items) {
            var _this = this;
            this.triggerPoint = window.innerHeight * 0.8;

            items.each(function() {
                var $this = $(this),
                    $children = $(this).find('[data-animation-child]');

                if ($children.length > 0) {

                    // setup children
                    $children.each(function() {
                        var $child = $(this);
                        var $delay = $child.attr('data-animation-delay');

                        $child.css({
                            '-webkit-animation-delay':  $delay,
                            '-moz-animation-delay':     $delay,
                            '-ms-animation-delay':      $delay,
                            '-o-animation-delay':       $delay,
                            'animation-delay':          $delay
                        });
                    });

                } else {

                    var $delay = $(this).attr('data-animation-delay');
                    
                    // setup single item
                    $this.css({
                        '-webkit-animation-delay':  $delay,
                        '-moz-animation-delay':     $delay,
                        '-ms-animation-delay':      $delay,
                        '-o-animation-delay':       $delay,
                        'animation-delay':          $delay
                    });

                }

                _this.animationElements.push($this);

            })
        },

        updatePage: function (plugin) {
            var _this = plugin;

            window.requestAnimationFrame(function () {
                _this.animateElements();
            })
        },

        animateElements: function() {
            var _this = this;
            var scrollPos = window.pageYOffset;
            
            if (scrollPos === this.lastScrollPos) return;

            this.lastScrollPos = scrollPos;

            for (var i=0; i < _this.animationElements.length; i++) {
                var $this = $(_this.animationElements[i]),
                    $children = $this.find('[data-animation-child]');

                if ($this.hasClass('animated') || (scrollPos < $this.offset().top - _this.triggerPoint))
                    return; // don't continue if its already been animated or scroll position hasn't hit the trigger point yet

                if ($children.length > 0) {

                    $this.addClass('animated');

                    // animate the children
                    $children.each(function() {
                        $(this).addClass('animated').addClass( $(this).attr('data-animation') )
                    });

                } else {

                    // animate the single item
                    $this.addClass('animated').addClass( $this.attr('data-animation') );

                }
            }
        }

    };

    $.fn[ pluginName ] = function (options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new ScrollAnimations(this, options));
            }
        });
    };

    //add support for amd
    if (typeof define === "function" && define.amd) {
        define(function () {
            return ScrollAnimations;
        });
    }

})(jQuery, window, document);
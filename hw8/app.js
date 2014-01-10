$(function () {
    $('.tab').accordion({
        headClass: '.tab__head', // same as default
        bodyClass: '.tab__body' // same as default
    });
    $('.chameleon').chameleon();
    $('.drag__item').draggable({
        containerClass: '.drag'
    });
});

$.fn.accordion = function (options) {
    var settings = $.extend({
        headClass: '.tab__head',
        bodyClass: '.tab__body',
        speed: 500,
        height: '220px'
    }, options);

    this.each(function(){
        var tab = $(this),
            head = $(settings.headClass, tab),
            link = $('a', head),
            body = $(settings.bodyClass, tab);

        link.on({
            click: function(e){
                if (!tab.hasClass('is-active')){
                    slide(body, false);
                } else {
                    slide(body, true);
                }
                e.preventDefault();
            }
        });
    });

    function slide(el, inverse) {
        var parent = el.parent();
        inverse ? parent.removeClass('is-active') : parent.addClass('is-active');

        el.stop().animate({
            height: inverse ? 0 : settings.height
        }, settings.speed);
    }

    return this;
};

// TODO: make better capture and restrict by containment field
$.fn.draggable = function (options) {
    var settings = $.extend({
            containerClass: '.drag'
        }, options);

    this.each(function () {
        var el = $(this),
            isDragging = false,
            container = settings.containerClass ? $(this).parents(settings.containerClass) : null,
            baseTop = settings.containerClass ? $(settings.containerClass).offset().top : $(this).offset().top,
            baseLeft = settings.containerClass ? $(settings.containerClass).offset().left : $(this).offset().left;

        el.on({
            mousedown: function (e) {
                isDragging = true;
            }
        });

        $('body').on({
            mousemove: function(e){
                if (isDragging) {
                    var top = e.pageY - baseTop,
                        left = e.pageX - baseLeft;

                    el.css({
                        top: top,
                        left: left
                    });
                }
            },
            mouseup: function (e) {
                isDragging = false;
            }
        });
    });

    return this;
};

$.fn.chameleon = function (options) {
    var settings = $.extend({
            speed: 500
        }, options),
        onClick = function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.stop().animate({
                backgroundColor: settings.activeColor
            }, settings.speed);
        },
        onHover = function () {
            var $this = $(this);
            $this.stop().animate({
                backgroundColor: settings.hoverColor
            }, settings.speed);
        },
        onLeave = function () {
            var $this = $(this);
            $this.stop().animate({
                backgroundColor: settings.defaultColor
            }, settings.speed);
        };
    return this.each(function () {
        var $this = $(this);
        $this.on('click', onClick);
        $this.on('mouseenter', onHover);
        $this.on('mouseleave', onLeave);
    });
};
$(function () {
    $('.tab').accordion({
        headClass: '.tab__head', // same as default
        bodyClass: '.tab__body' // same as default
    });
    $('.drag__item').draggable({
        containerClass: '.drag123'
    });
    $('.chameleon').chameleon();
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
            //containerClass: '.drag'
        }, options);

    this.each(function () {
        var el = $(this),
            isDragging = false,
            container = settings.containerClass ? $(this).parents(settings.containerClass) : null,
            containerMax = {};

        if (container.length){
                containerMax = {
                top: container.offset().top,
                left: container.offset().left,
                right: container.offset().left + container.width() - el.width(),
                bottom: container.offset().top + container.height() - el.height()
            }
        }

        el.on({
            mousedown: function (e) {
                isDragging = true;
                $(document.body).addClass('no-select');
            }
        });

        $('body').on({
            mouseup: function (e) {
                isDragging = false;
                $(document.body).removeClass('no-select');
            },
            mousemove: function (e) {
                if (isDragging) {
                    var top = parseInt(e.pageY, 10),
                        left = parseInt(e.pageX, 10);

                    if (container.length) {
                        // top side calculation
                        if (top > containerMax.top && top < containerMax.bottom) {
                            el.offset({top: top});
                        } else if (top > containerMax.bottom) {
                            el.offset({top: containerMax.bottom});
                        } else if (top < containerMax.top) {
                            el.offset({top: containerMax.top + 1});
                        }

                        // left side calculation
                        if (left > containerMax.left && left < containerMax.right) {
                            el.offset({left: left});
                        } else if (left > containerMax.right) {
                            el.offset({left: containerMax.right});
                        } else if (left < containerMax.left) {
                            el.offset({left: containerMax.left + 1});
                        }
                    } else {
                        el.offset({
                            top: top,
                            left: left
                        });
                    }

                }
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
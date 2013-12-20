var myApp = {
    init: function(){
        myApp.login.render();
        myApp.userList.render();
    }
};

myApp.userList = {
    elem: $('#list'),
    getTemplate: function(){
        return $.get( "partials/user-list.html");
    },
    render: function(){
        var self = this;

        $.when( this.getTemplate(), this.getData() ).done(function( a1, a2 ) {
            // a1 and a2 are arguments resolved for the page1 and page2 ajax requests, respectively.
            // Each argument is an array with the following structure: [ data, statusText, jqXHR ]
            var template = a1[ 0 ],
                data = a2[ 0 ];

            self.elem.html(Mark.up(template, data));
        });
    },
    getData: function(){
        return $.get( "http://www.jscacourse.co.vu/users");
    }
};

myApp.login = {
    elem: $('#login'),
    getTemplate: function(){
        return $.get( "partials/login.html");
    },
    render: function(){
        var self = this;

        $.when( this.getTemplate() ).done(function( a1 ) {
            // a1 and a2 are arguments resolved for the page1 and page2 ajax requests, respectively.
            // Each argument is an array with the following structure: [ data, statusText, jqXHR ]
            var template = a1;

            self.elem.html(Mark.up(template, null));
            self.attachEvents();
        });
    },
    attachEvents: function(){
        $('input#submitButton').click( function() {
            $.post( 'some-url', $('form#myForm').serialize(), function(data) {

                },
                'json' // I expect a JSON response
            );
        });

        $('input#submitButton').click( function() {
            $.ajax({
                url: 'some-url',
                type: 'post',
                dataType: 'json',
                data: $('form#myForm').serialize(),
                success: function(data) {

                }
            });
        });
    }
};

$(function(){
    myApp.init();
});

//this.login = $('#login');
//this.signup = $('#signup');
//this.list = $('#list');

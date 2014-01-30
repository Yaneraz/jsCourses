require.config({
    baseUrl: './',
    paths: {
        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
            'lib/jquery-1.10.2.min'
        ],
        'markup': 'lib/markup.min',
        'signals': 'lib/signals',
        'crossroads': 'lib/crossroads.min',
        'hasher': 'lib/hasher.min'
    }
});

require( ['jquery', 'markup', 'crossroads', 'hasher'], function($, Mark, crossroads, hasher) {
    var myApp = {
        API_URL: 'http://www.jscacourse.co.vu',
        token: '',
        init: function(){
            myApp.router();
        }
    },
        page = $('#page');

    myApp.router = function() {
        crossroads.addRoute('home', function() {
            myApp.userList.render();
        });
        crossroads.addRoute('users', function() {
            myApp.userList.render();
        });
        crossroads.addRoute('users/:id', function(id) {
            myApp.userPage.render(id);
        });
        crossroads.addRoute('login', function() {
            myApp.login.render();
        });
        crossroads.addRoute('signup', function() {
            myApp.signup.render();
        });
        crossroads.addRoute('logoff', function() {
            myApp.token = '';
        });

        function onHasherInit(curHash){
            if (curHash == '') {hasher.replaceHash('home');
            }
        }

        //setup hasher
        hasher.prependHash = '!/';
        hasher.initialized.add(onHasherInit);
        hasher.initialized.add(crossroads.parse, crossroads);
        hasher.changed.add(function(newHash, oldHash){
            page.html('');
            crossroads.parse(newHash);

            if (newHash === ''){
                crossroads.match('home');
            }
        });
        hasher.init();
    };

    myApp.userList = {
        elem: page,
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
            return $.get( myApp.API_URL + "/users");
        }
    };

    myApp.userPage = {
        elem: page,
        getTemplate: function(){
            return $.get( "partials/user-page.html");
        },
        render: function(userId){
            var self = this;

            $.when( this.getTemplate(), this.getData(userId) ).done(function( a1, a2 ) {
                // a1 and a2 are arguments resolved for the page1 and page2 ajax requests, respectively.
                // Each argument is an array with the following structure: [ data, statusText, jqXHR ]
                var template = a1[ 0 ],
                    data = a2[ 0 ];

                console.log(data)

                self.elem.html(Mark.up(template, data));
            });
        },
        getData: function(userId){
            return $.get( myApp.API_URL + "/users/" + userId, myApp.token);
        }
    };

    myApp.login = {
        elem: page,
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
            var form = $('#loginForm');

            form.submit(function(e) {
                $.post( myApp.API_URL + '/login', form.serialize(), function(data) {
                        console.log(data);
                        if (data.status === 'good to go'){
                            myApp.token = data.token;
                            alert(data.status);
                        }
                    },
                    'json' // I expect a JSON response
                );

                e.preventDefault();
            });

        }
    };

    myApp.signup = {
        elem: page,
        getTemplate: function(){
            return $.get( "partials/signup.html");
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
            var form = $('#signupForm');

            form.submit(function(e) {
                $.post( myApp.API_URL + '/signup', form.serialize(), function(data) {
                        alert(data.status);
                        if (data.status === 'New and shiny account for you!'){

                        }
                    },
                    'json' // I expect a JSON response
                );

                e.preventDefault();
                return false;
            });

        }
    };

    $(function(){
        myApp.init();

    });
});
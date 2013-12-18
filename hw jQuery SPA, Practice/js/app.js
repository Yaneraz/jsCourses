var myApp = {
    init: function(){
        myApp.userList.getData();
    }
};

myApp.userList = {
    elem: $('#list'),
    data: {},
    render: function(){
        var data = this.data;
        var template =
            '<ul class="small-block-grid-3">\
                {{ users }}\
                <li>\
                    <div class="person {{ user.gender }}">\
                        <a class="{{  }}" href="/user/{{ id }}"><i>{{ user.name.title }}</i> {{ user.name.last }}, {{ user.name.first }}</a>\
                    </div>\
                </li>\
                {{/users }}\
            </ul>';

        this.elem.html(Mark.up(template, data));
    },
    getData: function(){
        var self = myApp.userList;

        $.get( "http://www.jscacourse.co.vu/users", function( data ) {
            self.data.users = data;
            self.render();
        });
    }
};


$(function(){
    myApp.init();
});

//this.login = $('#login');
//this.signup = $('#signup');
//this.list = $('#list');

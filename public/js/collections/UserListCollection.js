(function(){

    APP.Collections.UsersList = Backbone.Collection.extend({
        model: APP.Models.User,
        url: '/users'
    })
})()
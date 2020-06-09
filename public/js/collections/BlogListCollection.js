(function(){

    APP.Collections.BlogList = Backbone.Collection.extend({
        model: APP.Models.Blog,
        url: '/blog'
    })
})()
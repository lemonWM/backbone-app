(function(){

    APP.Collections.OpinionsList = Backbone.Collection.extend({
        model: APP.Models.Opinion,
        url: '/opinions'
    })
})()
(function(){

    APP.Collections.PlacesList = Backbone.Collection.extend({
        model: APP.Models.Place,
        url: '/places'
    })
})()
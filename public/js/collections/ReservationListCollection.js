(function(){

    APP.Collections.ReservationsList = Backbone.Collection.extend({
        model: APP.Models.Reservation,
        url: '/reservations'
    })
})()
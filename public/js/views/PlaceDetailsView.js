(function(){

    APP.Views.PlaceDetails = Backbone.View.extend({

        tagName: 'div',
        className: 'element-details-place',
        template: _.template( $('#placeDetailsTemplate').html()),

        initialize: function(){

            this.listenTo(this.model, 'change', this.render)
        },

        render: function() {

            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.html(this.el)

            return this
        },

        events: {
            'click #bookAPlace': 'redirectToReservation'
        },

        redirectToReservation: function() {

            APP.router.navigate('reservations/new', {trigger: true})
        }
    })
})()
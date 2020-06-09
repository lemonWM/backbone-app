(function(){

    APP.Views.ReservationDetails = Backbone.View.extend({

        tagName: 'div',
        className: 'element-details-reservation',
        template: _.template( $('#reservationDetailsTemplate').html()),

        initialize: function() {

            this.listenTo(this.model, 'change', this.render)
        },

        render: function() {

            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.html(this.el)

            return this
        }
    })
})()
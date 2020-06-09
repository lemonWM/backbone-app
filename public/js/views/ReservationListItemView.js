(function(){

    APP.Views.ReservationListItem = Backbone.View.extend({

        tagName: 'li',
        className: 'list-item-reservation',
        template: _.template( $('#reservationItemTemplate').html()),

        render: function() {

            const html = this.template(this.model.toJSON())

            this.$el.html(html)

            return this
        },
        events: {
            "click #btn-details": 'showDetails'
        },
        showDetails: function(){

            APP.router.navigate('/reservation/'+ this.model.get('_id'), {trigger: true})
        }
    })
})()
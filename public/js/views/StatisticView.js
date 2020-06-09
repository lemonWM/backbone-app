(function() {

    APP.Views.Statistic = Backbone.View.extend({

        tagName: 'div',
        className: 'statistic',
        template: _.template( $('#statisticWidgetTemplate').html()),

        initialize: function() {

            const view = this

            $.when(

                $.ajax('/places'),
                $.ajax('/reservations'),
                $.ajax('/users')

            ).then(function(places, reservations, users) {

                view.render({
                    places: places[0].length,
                    reservations: reservations[0].length,
                    users: users[0].length,
                    reservationList: reservations
  
                })
            })
        },
        render: function(data) { // data- object from view.render

            const html = this.template(data)

            this.$el.html(html)

            APP.Regions.appHeader.append(this.el)

            return this
        }
    })
})()
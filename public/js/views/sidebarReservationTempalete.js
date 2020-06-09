(function(){

    APP.Views.sidebarReservation = Backbone.View.extend({

        tagName: 'div',
        className: 'sidebar-reservation-last',
        template: _.template( $('#reservationsLastSidebarTemplate').html()),

        initialize: function() {

            const view = this

            $.when(

                $.ajax('/reservations'),

            ).then(function(reservations) {

                view.render({
                    reservationList: reservations
                })
            })
        },
        render: function(data) {

            const html = this.template(data)

            this.$el.html(html)

            APP.Regions.appSidebar.append(this.el)

            return this
        },

        events: {
            'click #goToReservation': 'redirectToNewReservation',
            'click #closeSidebar': 'hideSidebar'
        },

        redirectToNewReservation: function(e) {

            e.preventDefault()

            APP.router.navigate('/reservations/new', {trigger: true})
        },

        hideSidebar: function(e) {

            e.preventDefault()

            $('#app-content-sidebar').toggleClass( "hide" )
        }
    })
})()
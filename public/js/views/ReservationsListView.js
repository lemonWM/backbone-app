(function() {

    APP.Views.ReservationsList = Backbone.View.extend({

        tagName: 'ul',
        className: 'app-items-list',

        initialize: function() {

            this.listenTo(this.collection, 'reset', this.render)
        },

        render: function() {
            
            let addNew = new APP.Views.ActionPanel({
                collectionName: 'reservations',
                elementName: 'travel reservation',
                searchBy: 'user'
            })

            this.actionViews = [addNew]
            
            this.collection.each(this.addOne, this)

            APP.Regions.appContent.append(addNew.render().el)
            APP.Regions.appContent.append(this.el)
        },

        addOne: function(model) {

            let view = new APP.Views.ReservationListItem({model: model})

            this.$el.append(view.render().el)
        }
    })
})()
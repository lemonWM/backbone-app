(function() {

    APP.Views.PlacesList = Backbone.View.extend({

        tagName: 'ul',
        className: 'app-items-list place',

        initialize: function() {

            this.listenTo(this.collection, 'reset', this.render)
        },

        render: function() {
            
            let addNew = new APP.Views.ActionPanel({
                collectionName: 'places',
                elementName: 'place profile',
                title: 'Best Experiences',
                searchBy: 'localization'
            })

            this.actionViews = [addNew]
            
            this.collection.each(this.addOne, this)

            APP.Regions.appContent.append(addNew.render().el)
            APP.Regions.appContent.append(this.el)
        },

        addOne: function(model) {

            let view = new APP.Views.PlaceListItem({
                model: model
            })

            this.$el.append(view.render().el)
        }
    })
})()
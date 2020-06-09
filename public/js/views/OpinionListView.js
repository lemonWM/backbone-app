(function(){

    APP.Views.OpinionList = Backbone.View.extend({

        tagName: 'ul',
        className: 'app-items-list',

        initialize: function(){

            this.listenTo(this.collection, 'reset', this.render)
        },

        render: function(){

            let addNew = new APP.Views.ActionPanel({
                collectionName: 'opinions',
                elementName: 'opinion',
                searchBy: 'localization'
            })

            this.actionViews = [addNew]
            
            this.collection.each(this.addOne, this)

            APP.Regions.appContent.append(addNew.render().el)
            APP.Regions.appContent.append(this.el)
        },

        addOne: function(model){

            let view = new APP.Views.OpinionListItem({model: model})

            this.$el.append(view.render().el)
        }
    })
})()
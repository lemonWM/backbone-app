(function(){

    APP.Views.UsersList = Backbone.View.extend({

        tagName: 'ul',
        className: 'app-items-list',
        
        initialize: function() {

            this.listenTo(this.collection, 'reset', this.render)
        },

        render: function() {

            let addNew = new APP.Views.ActionPanel({
                collectionName: 'users',
                elementName: 'user profile',
                searchBy: 'first or last name'
            })

            this.actionViews = [addNew]
            
            this.collection.each(this.addOne, this)

            APP.Regions.appContent.append(addNew.render().el)
            APP.Regions.appContent.append(this.el)
        },
        
        addOne: function(model){

            let view = new APP.Views.UserListItem({model: model})

            this.$el.append(view.render().el)
        }
    })
})()
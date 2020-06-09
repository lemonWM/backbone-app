(function(){

    APP.Views.BlogList = Backbone.View.extend({

        tagName: 'ul',
        className: 'app-items-list blog-list',

        initialize: function(){

            this.listenTo(this.collection, 'reset', this.render)
        },

        render: function(){

            let addNew = new APP.Views.ActionPanel({
                collectionName: 'blog',
                elementName: 'blog post',
                searchBy: 'title'
            })

            this.actionViews = [addNew]

            this.collection.each(this.addOne, this)

            APP.Regions.appContent.append(addNew.render().el)

            APP.Regions.appContent.append(this.el)
        },

        addOne: function(model){

            let view = new APP.Views.BlogListItem({model: model})

            this.$el.append(view.render().el)
        }
    })
})()
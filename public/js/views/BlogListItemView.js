(function(){

    APP.Views.BlogListItem = Backbone.View.extend({

        tagName: 'li',
        className: 'list-item-blog',
        template: _.template( $('#blogItemTemplate').html()),

        render: function(){

            const html = this.template(this.model.toJSON())

            this.$el.html(html)

            return this
        },
        events: {
            "click #btn-details": 'showDetails'
        },
        showDetails: function(){

            APP.router.navigate('/article/'+ this.model.get('_id'), {trigger: true})
        }
    })
})()

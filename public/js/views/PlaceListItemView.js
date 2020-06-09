(function(){

    APP.Views.PlaceListItem = Backbone.View.extend({

        tagName: 'li',
        className: 'list-item-places',
        template: _.template( $('#placeItemTemplate').html()),

        render: function(){

            const html = this.template(this.model.toJSON())

            this.$el.html(html)

            return this
        },
        events: {
            "click #btn-details": 'showDetails'
        },
        showDetails: function(){

            APP.router.navigate('/place/'+ this.model.get('_id'), {trigger: true})
        }
    })
})()

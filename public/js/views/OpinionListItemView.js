(function(){

    APP.Views.OpinionListItem = Backbone.View.extend({

        tagName: 'li',
        className: 'list-item-opinion',
        template: _.template( $('#opinionItemTemplate').html()),

        render: function(){

            const html = this.template(this.model.toJSON())

            this.$el.html(html)

            return this
        },
        events: {
            "click #btn-details": 'showDetails'
        },
        showDetails: function(){

            APP.router.navigate('/opinion/'+ this.model.get('_id'), {trigger: true})
        }
    })
})()
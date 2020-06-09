(function(){

    APP.Views.UserListItem = Backbone.View.extend({

        tagName: 'li',
        className: 'list-item-user',
        template: _.template( $('#userItemTemplate').html()),

        render: function(){
            
            const html = this.template(this.model.toJSON())

            this.$el.html(html)

            return this
        },

        events: {
            "click #btn-details": "showDetails"
        },
        
        showDetails: function(){
            
            APP.router.navigate('/user/'+ this.model.get('_id'), {trigger: true})
        }
    })
})()
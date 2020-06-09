(function(){

    APP.Views.OpinionDetails = Backbone.View.extend({

        tagName: 'div',
        className: 'element-details-opinion',
        template: _.template( $('#opinionDetailsTemplate').html()),

        initialize: function() {

            this.listenTo(this.model, 'change', this.render)
        },

        render: function() {

            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.html(this.el)

            return this
        }
    })
})()
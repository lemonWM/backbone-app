(function(){

    APP.Views.UserNew = Backbone.View.extend({

        tagName: 'div',
        className: 'element-new',

        template: _.template( $('#userNewTemplate').html()),

        initialize: function() {

            this.listenTo(this.model, 'invalid', this.showErrorInfo)
            this.render()
        },
        
        render: function() {

            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.append(this.el)

            this.stickit() // for bindings on post

            model = this.model

            return this
        },

        bindings:{
            '#first_name': 'first_name',
            '#last_name': 'last_name',
            '#birthdate': 'birthdate',
            "#address": 'address',
            "#zip_code": 'zip_code',
            "#city": 'city',
            "#login": 'login',
            "#password": 'password',
        },

        events: {
            'submit form': 'saveNew'
        },

        showErrorInfo: function() {

            confirm(this.model.validationError)
        },

        saveNew: function(e){

            e.preventDefault()

            this.model.save({}, {wait: true})

            APP.router.navigate('/users', {trigger: true})
        }
    })
})()
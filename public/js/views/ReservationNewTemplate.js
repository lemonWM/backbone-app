(function(){

    APP.Views.ReservationNew = Backbone.View.extend({

        tagName: 'div',
        className: 'element-new',
        template: _.template( $('#reservationNewTemplate').html()),

        initialize: function() {
            
            this.listenTo(this.model, 'invalid', this.showErrorInfo)
            this.render()
        },
        
        render: function() {

            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.append(this.el)

            model = this.model

            // get user from /users
            const userField = this.$('#user').magicSuggest({
                data: '/users',
                method: 'get',
                valueField: 'name',
                displayValue: 'name',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: 'Select user',
                queryParams: 'users',
                cls: 'medium'
            }) // autocomplete users from /users

            $(userField).on('selectionchange', function(e, m, users) {

                if(users.length > 1){ 

                    this.removeFromSelection(users[0], true)
                    $('#password-check').removeClass('active')
                    $('#sendBtn').prop('disabled', true)
                    $('#password-check').val('')
                }
                if(users.length){

                    $('#user-password').change(function(){

                        let value = ($(this).val())
                        let userPassword = users[0].password

                        if (value !== userPassword) {
                            
                            alert('Incorrect password')
                            $('#sendBtn').prop('disabled', true)
                            $('#password-check').removeClass('active')

                        } else {
                            
                            $('#password-check').addClass('active')
                            $('#sendBtn').prop('disabled', false)

                            model.set('user', users[0].name)
                        }
                   })
                } else {
                   
                    model.set('user', '')
                }
            });

            // get destination from /places
            const destinationField = this.$('#destination').magicSuggest({
                data: '/places',
                method: 'get',
                valueField: 'name',
                displayValue: 'destination',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: 'Select destination',
                queryParams: 'destination',
                cls: 'medium'
            }) 

            $(destinationField).on('selectionchange', function(e, m, destination) {

                if(destination.length > 1){ 

                    this.removeFromSelection(destination[0], true)
                }
                if(destination.length){
                    
                    model.set('destination', destination[0].name)
                } else {
                   
                    model.set('destination', '')
                }
            });

            return this
        },

        events: {
            'change input#dateFrom': 'setDateFrom',
            'change input#dateTo': 'setDateTo',
            'submit form': 'saveNew',
        },

        setDateFrom: function(e) {
            let val = $(e.currentTarget).val()
            model.set('dateFrom', val)
        },

        setDateTo: function(e) {
            let val = $(e.currentTarget).val()
            model.set('dateTo', val)
        },

        showErrorInfo: function() {

            confirm(this.model.validationError)
        },

        saveNew: function(e){

            e.preventDefault()

            this.model.save({}, {wait: true})

            APP.router.navigate('/reservations', {trigger: true})
        }
    })
})()
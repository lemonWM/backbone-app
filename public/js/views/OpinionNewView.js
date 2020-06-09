(function() {

    APP.Views.OpinionNew = Backbone.View.extend({

        tagName: 'div',
        className: 'element-new',

        template: _.template( $('#opinionNewTemplate').html()),

        initialize: function() {

            this.listenTo(this.model, 'invalid', this.showErrorInfo)
            this.render()
        },
        
        render: function() {

            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.append(this.el)

            this.stickit() 

            model = this.model

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
            })

            $(userField).on('selectionchange', function(i, e, users){

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
            })

            const destinationField = $('#aboutDestination').magicSuggest({
                data: '/places',
                method: 'get',
                valueField: 'name',
                displayValue: 'aboutDestination',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: 'Select destination',
                queryParams: 'aboutDestination',
                cls: 'medium'
            })

            $(destinationField).on('selectionchange', function(i, e, destination) {

                if(destination.length > 1){ 

                    this.removeFromSelection(destination[0], true)
                }
                if(destination.length){
                    
                    model.set('aboutDestination', destination[0].name)
                } else {
                   
                    model.set('aboutDestination', '')
                }
            })

            return this
        },
        
        bindings:{
            '#opinion': 'comment'   
        },
        
        events: {
            'submit form': 'saveNew'
        },

        getDate: function(){
            
            let date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
            return date
        },

        getRatingValue: function(){

            organization = $('#organization').val()
            attractions = $('#attractions').val()
            hotel = $('#hotel').val()

            let rating = null

            if(organization && attractions && hotel ){
                
                rating = {
                    organization: organization,
                    attractions: attractions,
                    hotel: hotel
                }
            }

            return rating // value of rating
        },

        showErrorInfo: function() {

            confirm(this.model.validationError)
        },

        saveNew: function(e){

            e.preventDefault()

            model.set('raiting', this.getRatingValue())
            model.set('data', this.getDate())

            this.model.save({}, {wait: true})

            APP.router.navigate('/opinions', {trigger: true})

        }
    })
})()
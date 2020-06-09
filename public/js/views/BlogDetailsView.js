(function(){

    APP.Views.BlogDetails = Backbone.View.extend({

        tagName: 'div',
        className: 'element-details-blog',

        template: _.template( $('#blogDetailsTemplate').html()),

        initialize: function() {

            this.listenTo(this.model, 'change', this.render)
            this.listenTo(this.model, 'invalid', this.showErrorInfo)
        },

        render: function() {

            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.html(this.el)

            this.stickit()

            model = this.model

            comments = []

            comment = {
                author: null,
                text: null,
                data: null
            }   

            const userField = this.$('#comment-author').magicSuggest({
                data: '/users',
                method: 'get',
                valueField: 'name',
                displayValue: 'name',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: 'first & last name',
                queryParams: 'users',
                cls: 'medium'
            }) // autocomplete users from /users

            $(userField).on('selectionchange', function(e, m, users) {

                if(users.length > 1){ 

                    this.removeFromSelection(users[0], true)
                    $('#password-check').removeClass('active')
                    $('#sendComment').prop('disabled', true)
                    $('#password-check').val('')
                    
                }
                if(users.length){
                    
                   comments =[]

                   $('#author-password').change(function(){

                        let value = ($(this).val())
                        let userPassword = users[0].password

                        if (value !== userPassword) {
                            $('#sendComment').prop('disabled', true)
                            $('#password-check').removeClass('active')
                        } else {
                            $('#password-check').addClass('active')
                            $('#sendComment').prop('disabled', false)
                        }
                   })
                   
                   $('#comment-text').change(function() {
                      
                        comments =[]
                        password =[]

                        function getDate() {

                            let date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
                            return date
                        }
                        comment = {
                            author: users[0].name,
                            text: $(this).val(),
                            data: getDate()
                        } 
                        if(comment.author && comment.text ) {
                                
                            comments.push(comment)
                        }
                    })


                } else {

                    model.set('comments', null)                  
                }
            });

            return this
        },
     
        events: {
           'click #sendComment': 'sendComment'
        },

        getDate: function(){
           
            let date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
            return date
        },

       showErrorInfo: function(){

            confirm(this.model.validationError)
       },
       
       sendComment: function(e) {

            e.preventDefault()

            model.set('comments', comments)
            model.set('data', this.getDate())
            this.model.save({}, { wait: true })
            
            APP.router.navigate('/blog', {trigger: true})
       },
    })
})()
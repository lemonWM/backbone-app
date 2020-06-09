(function(){

    APP.Views.BlogNew = Backbone.View.extend({

        tagName: 'div',
        className: 'element-new',

        template: _.template( $('#blogNewTemplate').html()),

        initialize: function() {

            this.listenTo(this.model, 'invalid', this.showErrorInfo) // validation error
            this.render()
        },

        render: function() {
            
            let html = this.template(this.model.toJSON())

            this.$el.html(html)

            APP.Regions.appContent.append(this.el)
            
            model = this.model
            
            this.stickit() 

            articles = []
            pictures = []
            comments = []

            const userField = this.$('#user').magicSuggest({
                data: '/users',
                method: 'get',
                valueField: 'name',
                displayValue: 'user',
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

            return this
        },

        bindings:{
            '#title': 'title',
            '#subtitle': 'subtitle',
            "#logo": 'logo'   
        },

        events: {
            'submit form': 'saveNew',
            'click #confirmText': 'getArticleValue',
            'click #confirmImages': 'getImagesValue',
            'click #createNewTextLine': 'createNewTextLine',
            'click #createNewImgLine':'createNewImgLine'
        },

        createNewTextLine: function(e){

            e.preventDefault()
            $('#articles-container').append('<textarea type="text" id="articles" placeholder="Write another chapter"></textarea>')
        },

        createNewImgLine: function(e){

            e.preventDefault()
            $('#images-container').append('<input type="text" id="image" placeholder="Sign another url/address">')
        },

        getArticleValue: function(){

            articles = []

            $('#articles-elements').find("textarea").each(function(){
                  
                articles.push($(this).val())
            })
        },

        getImagesValue: function(){

            pictures = []

            $('#pictures-elements').find("input").each(function(){

                pictures.push($(this).val())
            })
        },

        getDate: function(){
            let date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
            return date
        },

        commentsModel: function(){
            let comment = {
                author: '',
                text: '',
                data: this.getDate()
            }
            comments.push(comment)

            return comments
        },
        showErrorInfo: function(){

            confirm(this.model.validationError)
        },
        saveNew: function(e){

            e.preventDefault()

            model.set('articles', articles)

            model.set('pictures', pictures)

            model.set('data', this.getDate())

            if(!model.attributes.comments.length){
                model.set('comments', this.commentsModel())
            }
            this.model.save(
                {},{
                    dataType: 'text',
                    success: function() {
                        APP.router.navigate('/blog', {trigger: true})
                    },
                    error: function() {
                        console.log('error');
                    },
                    wait: true 
                }
            )
        }
    })
})()
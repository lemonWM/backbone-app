(function(){

    APP.Models.User = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            first_name: '',
            last_name: '',
            birthdate: '',
            address: '',
            zip_code: '',
            city: '',
            login: '',
            password: ''
        },

        validate: function(attributes, options){

            if(attributes.first_name ===''){
                return 'Write name'
            }

            if(attributes.last_name ===''){
                return 'Write last name'
            }

            if( !attributes.birthdate.match(/^(\w{4}-\w{2}-\w{2})$/) ){
                return 'select date'
            }

            if(attributes.address ===''){
                return 'Write address'
            }

            if( !attributes.zip_code.match(/^(\d{2}-\d{3})$/)){
                return 'Write Zip Code in format ex 00-000'
            }

            if(attributes.city ===''){
                return 'Write localization'
            }

            if(attributes.login ===''){
                return 'Write login'
            }

            if( !attributes.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/)){
                return 'Set password using minimum five sign: one capital letter character, one lower letter character, one number'
            }
       
         },

        url: function() {
            if(this.isNew()) {
                return '/users'
            } else {
                return '/user/' + this.get('_id')
            }
        }
    })
})()
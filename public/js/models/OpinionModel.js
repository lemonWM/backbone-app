(function(){

    APP.Models.Opinion = Backbone.Model.extend({

        idAttribute: '_id',
        defaults: {
            user: '',
            aboutDestination: '',
            raiting: null,
            comment: '',
        },

        validate: function(attributes, options){

            if(attributes.user === ''){
                return 'Select user name'
            }
            if(attributes.aboutDestination ===''){
                return 'Select destination'
            }
            if(attributes.raiting === null) {
                return "Select complete value for rating"
            }
            if(attributes.comment ===''){
                return 'Write your comment'
            }
        },

        url: function(){
            if(this.isNew()){
                return '/opinions'
            } else {
                return '/opinion/' + this.get('_id')
            }
        }
    })
})()
(function(){

    APP.Models.Blog = Backbone.Model.extend({
        
        idAttribute: '_id',
        defaults: {
            user: '',
            title: '',
            subtitle:'',
            articles: [],
            pictures: [],
            logo: '',
            comments: [],
        },
        validate: function (attributes, options) {

            if(attributes.user === ''){
                return "Set first and last name"
            }
            if(attributes.title === ''){
                return "Set post title"
            }
            if(attributes.subtitle === ''){
                return "Set subtitle and last name"
            }
            if(! attributes.articles.length ){
                return "Write some text and accept"
            }
            if(! attributes.pictures.length ){
                return "Add imgage url and accept"
            }
            if(attributes.logo === ''){
                return "Set post logo url"
            }
            if(! attributes.comments.length){
                return "Set correct user, password and text in comment"
            }
        },
        url: function() {
            if(this.isNew()){
                return '/blog'
            } else {
                return '/article/' + this.get('_id')
            }
        }
    })
})()
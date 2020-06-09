(function(){

    APP.Views.ActionPanel = Backbone.View.extend({

        tagName: 'div',
        className: 'action-element',
        template: _.template( $('#actionPanelTemplate').html()),

        initialize: function(options){

            this.options = options 
        },
        render: function(){

            this.$el.append( this.template({
                order: this.options.order,
                placeholder: this.options.placeholder,
                elementName: this.options.elementName,
                collectionName: this.options.collectionName,
                title: this.options.title,
                searchBy: this.options.searchBy
            }))
            return this
        },
        events: {
            'click .add': 'showAdd',
            'keyup .app-search input':'setSearch'
        },

        showAdd: function(){

            let url = this.options.collectionName + '/new'

            if(this.options.collectionName === 'blog'){
                url = this.options.collectionName + '/new-article'
            } 

            APP.router.navigate(url, {trigger: true})
        },

        setSearch: function(){

            clearTimeout(this.searchTimeout)

            this.searchTimeout = setTimeout(_.bind(this.searchCollection, this), 700) 
            // function searchCollection -> key up 0.5s 
        },
        searchCollection: function(e) {

             let value = this.$('.app-search input').val().toLowerCase()
             //value of search ex. place Bali
 
             if(value) {
 
                 const url = this.options.collectionName + '/search/'+ value
 
                 APP.router.navigate(url, {trigger: true})
             } else {
 
                 APP.router.navigate(this.options.collectionName, {trigger: true})
             }
         }
    })
})()
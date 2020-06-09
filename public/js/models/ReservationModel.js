(function(){

    APP.Models.Reservation = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            user: '',
            destination: '',
            dateFrom: '',
            dateTo:'',
        },

        validate: function(attribute, options){

            if(attribute.user ===''){
                return 'Select user'
            }

            if(attribute.destination ===''){
                return 'Select destination'
            }

            if(!attribute.dateFrom.match(/^(\w{4}-\w{2}-\w{2})$/)){
                return 'Select start date'
            }

            if(!attribute.dateTo.match(/^(\w{4}-\w{2}-\w{2})$/)){
                return 'Select back date'
            }
        },

        url: function() {
            if(this.isNew()) {
                return '/reservations'
            } else {
                return '/reservation/' + this.get('_id')
            }
        }
    })
})()
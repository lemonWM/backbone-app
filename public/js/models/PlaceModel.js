(function(){

    APP.Models.Place = Backbone.Model.extend({
        idAttribute: '_id',
        url: function() {
            if(this.isNew()) {
                return '/places'
            } else {
                return '/place/' + this.get('_id')
            }
        }
    })
})()
(function() {

    APP.Routers.Router = Backbone.Router.extend({

         routes: {
            '': "showPlaces",
            'places(/search/:search)': "showPlaces",
            'place/:id': 'showPlaceDetails',
            
            'users(/search/:search)': "showUsers",
            'user/:id': "showUserDetails",
            'users/new': 'showUserNew',

            'reservations(/search/:search)': "showReservations",
            'reservation/:id': "showReservationDetails",
            'reservations/new': 'showReservationNew',

            'opinions(/search/:search)': 'showOpinions',
            'opinion/:id': 'showOpinionDetails',
            'opinions/new': 'showOpinionNew',
            
            'blog(/search/:search)': 'showBlog',
            'article/:id': 'showBlogDetails',
            'blog/new-article': 'showBlogNew',
         },
         
         showPlaces: function(search) {
            var search = search || ''
            let places = new APP.Collections.PlacesList() 
            let view = new APP.Views.PlacesList({
                  collection: places,
                  search: search
               }) 
        
            APP.showMainView(view) 

            places.fetch({
                reset: true,
                data: {
                    limit: 5,
                    name: search
                }
            })

            APP.Views.NavBar.navigation('places') 
         },
         showPlaceDetails: function(id){ // set id 

            let place = new APP.Models.Place({_id:id})
            let view = new APP.Views.PlaceDetails({model: place})

            APP.showMainView(view)

            place.fetch()

            APP.Views.NavBar.navigation('places')
         },


         showUsers: function(search) {
            var search = search || ''
            let users = new APP.Collections.UsersList()
            let view = new APP.Views.UsersList({
               collection: users,
               search: search
            })

            APP.showMainView(view)

            users.fetch({
               reset: true,
               data: {
                  name: search
               }
            })

            APP.Views.NavBar.navigation('users')
         },
         showUserDetails: function(id){

            let user = new APP.Models.User({_id: id})
            let view = new APP.Views.UserDetails({model: user})

            APP.showMainView(view)

            user.fetch()

            APP.Views.NavBar.navigation('users')
         },
         showUserNew: function() {

            let user = new APP.Models.User({})
            let view = new APP.Views.UserNew({model:user})

            APP.showMainView(view)

            APP.Views.NavBar.navigation('users')
         },


         showReservations: function(search) {

            var  search = search || ''
            let reservations = new APP.Collections.ReservationsList()
            let view = new APP.Views.ReservationsList({
               collection: reservations,
               search: search
            })

            APP.showMainView(view)

            reservations.fetch({
               reset: true,
               data: {
                  name: search
               }
               
            })

            APP.Views.NavBar.navigation('reservations')
         },
         showReservationDetails: function(id){

            let reservation = new APP.Models.Reservation({_id: id})
            let view = new APP.Views.ReservationDetails({model: reservation})

            APP.showMainView(view)

            reservation.fetch()

            APP.Views.NavBar.navigation('reservations')
         },
         showReservationNew: function(id) {

            let reservation = new APP.Models.Reservation()
            let view = new APP.Views.ReservationNew({model: reservation})

            APP.showMainView(view)

            APP.Views.NavBar.navigation('reservations')
         },

         showOpinions: function(search) {
            var search = search || ''
            let opinions = new APP.Collections.OpinionsList()
            let view = new APP.Views.OpinionList({
               collection: opinions,
               search: search
            })

            APP.showMainView(view)

            opinions.fetch({
               reset: true,
               data: {
                  name: search
               }
            })

            APP.Views.NavBar.navigation('opinions')
         },
         showOpinionDetails: function(id) {

            let opinion = new APP.Models.Opinion({_id: id})
            let view = new APP.Views.OpinionDetails({
               model: opinion
            })

            APP.showMainView(view)

            opinion.fetch()

            APP.Views.NavBar.navigation('opinions')
         },
         showOpinionNew: function() {
            
            let opinion = new APP.Models.Opinion()
            let view = new APP.Views.OpinionNew({model: opinion})

            APP.showMainView(view)

            APP.Views.NavBar.navigation('opinions')
         },

         showBlog: function(search){
            var  search = search || ''
            let blog = new APP.Collections.BlogList()
            let view = new APP.Views.BlogList({
               collection: blog,
               search: search
            })

            APP.showMainView(view)

            blog.fetch({
               reset: true,
               data: {
                  name: search
               }
               
            })

            APP.Views.NavBar.navigation('blog')
         },

         showBlogDetails: function(id){
            
            let blog = new APP.Models.Blog({_id: id})
            let view = new APP.Views.BlogDetails({model: blog})

            APP.showMainView(view)

            blog.fetch()

            APP.Views.NavBar.navigation('blog')
         },
         showBlogNew: function(){

            let blog = new APP.Models.Blog({})
            let view = new APP.Views.BlogNew({model: blog})

            APP.showMainView(view)

            APP.Views.NavBar.navigation('blog')
         }
    })
})() 
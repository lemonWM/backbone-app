(function() {

    window.APP = {

        Models: {},
        Collections: {},
        Views: {},
        Routers: {},

        Regions: {
            appHeader: $('#app-header'),
            appContent: $('#app-content'),
            appSidebar: $('#app-content-sidebar')
            
        },
        ViewInstances: {}     
    };

    APP.showMainView = function(view) {
        if(APP.ViewInstances.mainView) {

            var actionViews = APP.ViewInstances.mainView.actionViews

            if(actionViews){

                _.each(actionViews, function(actionViews) {
                    actionViews.remove()
                })
            } // sprawdzanie dla paginacji 
            APP.ViewInstances.mainView.remove()
        }
        APP.ViewInstances.mainView = view
    },

    APP.showStatiticView = function(view){
        if(APP.ViewInstances.statistic){
            
            APP.ViewInstances.statistic.remove()
        }
        APP.ViewInstances.statistic = new APP.Views.Statistic()
    } , // statistic in app-header

    APP.showSidebarReservation = function(view){
        if(APP.ViewInstances.reservations) {
            APP.ViewInstances.reservations.remove()
        }
        APP.ViewInstances.reservations = new APP.Views.sidebarReservation()
    }, // reservation in sidebar

    APP.init = function() {

        APP.router = new APP.Routers.Router()

        APP.showStatiticView()
        APP.showSidebarReservation()

        Backbone.history.start({pushState: true});
    }
})() 
(function() {

     APP.Views.NavBar = {

        menu: ( $('.app-sidebar-nav a')), // boczne mennu
        tabs: ( $('.app-main-tabs')),
        tabItems: ( $('.app-main-tabs a')), // zakladki

        navigation: function(route) {

            const tabItem = this.tabItems.filter("[href='/"  + route  + "']")
            const tab = tabItem.parent()
            const tabsId = tab.attr('id')
            const menuItem = this.menu.filter("[data-tabs='" + tabsId + "']")   

            this.menu.removeClass('active')
            this.tabs.removeClass('active')
            this.tabItems.removeClass('active')

            menuItem.addClass('active')
            tab.addClass('active')
            tabItem.addClass('active')   
        },
     }
})() 
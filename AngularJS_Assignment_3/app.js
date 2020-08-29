(function() {
  'use strict';

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective)
  .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'resultlist',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.checkForResultCount = function() {
      var returnval;

      if (list.items === null || list.items === undefined)
        returnval = false;
      else {
        if (list.items.length > 0)
          returnval = true;
        else {
          returnval = false;
        }
      }
      return returnval;
    };

  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService){
    var searcher = this;

    // SUSPECT THIS IS NOT SUPPOSED TO BE DONE HERE!!...
    searcher.removeItem = function (itemIndex) {
        console.log("least its running" );
        searcher.filteredItems.splice(itemIndex, 1);
    };

    searcher.callMenuApi = function (searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (response) {

        // now we try to loop through these items!
        var foundItems = response.data.menu_items;
        var filteredItems = [];

        foundItems.forEach((item, i) => {
          if (searchTerm === "" || searchTerm === undefined || searchTerm === null){
            if (filteredItems.indexOf(item.name) === -1)
              filteredItems.push(item.name);
          }
          else if (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            if (filteredItems.indexOf(item.name) === -1)
              filteredItems.push(item.name);
        });

        searcher.filteredItems = filteredItems;
      })
      .catch(function (error)
      {
        console.log("Error: " + error)
      })
    };

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var svc = this;

    svc.getMatchedMenuItems = function (searchTerm) {
      // here I need to call the http method!
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };

    // SOMEHOW I THINK THE REMOVE NEEDS TO BE IMPLMENTED HERE...
    // Is this even required?
    // svc.removeItem = function (itemIndex) {
    //   console.log("least its running" + itemIndex);
    // }
  }

})();

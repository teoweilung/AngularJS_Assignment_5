(function() {
  "use strict";

  angular.module('public')
  .service('SignUpService', SignUpService);

  SignUpService.$inject = ['$http', 'ApiPath'];
  function SignUpService($http, ApiPath) {
    var svc = this;

    var signedUpUsers;

    svc.signUp = function(signupInfo) {
      return $http.get(ApiPath + '/menu_items/' + signupInfo.favouritedish + '.json').then(function (response) {
        return response;
      });
    }

    svc.addMemberToArray = function(signupInfo) {
      signedUpUsers = signupInfo;
    }

    svc.getSignedUpUser = function() {
      return signedUpUsers;
    }

  };
})();

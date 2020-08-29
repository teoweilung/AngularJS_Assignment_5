(function() {

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignUpService', 'userInfo'];
function MyInfoController(SignUpService, userInfo) {
    var myinfo = this;

    myinfo.user = userInfo;

    myinfo.isUserNotSignedUp = function() {
      if (!userInfo)
        return true;
    };

    //
    // signup.submit = function () {
    //   var promise = SignUpService.signUp(signup);
    //   promise.then(function (response) {
    //     SignUpService.addMemberToArray(signup);
    //     signup.resultmsg = "Your information has been saved!";
    //   })
    //   .catch (function (error){
    //     signup.resultmsg = "Menu item does not exist, please try again!";
    //   })
    // };
}

})();

(function() {

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService'];
function SignUpController(SignUpService) {
    var signup = this;

    signup.submit = function () {
      var promise = SignUpService.signUp(signup);
      promise.then(function (response) {
        SignUpService.addMemberToArray(signup);
        signup.resultmsg = "Your information has been saved!";
      })
      .catch (function (error){
        signup.resultmsg = "Menu item does not exist, please try again!";
      })
    };
}

})();

(function () {
    angular
        .module('WebAppMaker')
        .controller('mainController', mainController);

    function mainController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }
})();
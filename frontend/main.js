(function () {

    const myApp = angular.module('myApp', ['components', 'controller', 'filter', 'services']);

    myApp.config(["serviceConfigProvider", function (serviceConfigProvider) {
        serviceConfigProvider.webServiceUrl = "http://some.service.local:6789/cool/";
    }])

})();
(function () {

    const module = angular.module('components');

    module.directive('peopleList', function() {
        return {
            restrict: 'E',
            scope: {
                'title': '=',
                'people': '='
            },
            templateUrl: 'components/peopleList.html'
        };
    });

})();
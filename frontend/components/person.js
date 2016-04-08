(function () {

    const module = angular.module('components');

    module.directive('person', function() {
        return {
            restrict: 'E',
            scope: {
                'person': '='
            },
            templateUrl: 'components/person.html'
        };
    });

})();
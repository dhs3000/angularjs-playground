(function () {

    describe('my first test', function () {

        it('success', function () {
            expect(3 + 4).toBe(7);
        });

        describe('My App', function () {

            describe('The peopleController', function () {
                var injector = angular.injector(['ng', 'myApp']);
                var $rootScope = injector.get('$rootScope');
                var $controller = injector.get('$controller');

                beforeEach(function () {
                    this.scope = $rootScope.$new();
                    this.controller = $controller('peopleController', {
                        '$scope': this.scope
                    });
                });

                it('should exists', function () {
                    expect(this.controller).toBeDefined();
                });

                it('should contain 3 people', function () {
                    expect(this.controller.allPeople()).toHaveLength(3);
                });

                it('should contain 3 names', function () {
                    expect(this.controller.allNames()).toHaveSameItems(['Doe/John', 'Paan/Peter', 'TheCat/Jerry']);
                });
            });

            describe('the translate filter', function () {
                var injector = angular.injector(['ng', 'myApp']);
                var $filter = injector.get('$filter');

                beforeEach(function () {
                    this.navigator = {userLanguage: undefined};
                    this.$window = {navigator: this.navigator};
                    this.translate = $filter('translate', {
                        '$window': this.$window
                    });
                });

                it('should mark an unknown translation', function () {

                    this.navigator.userLanguage = 'de-DE';

                    expect(this.translate('unknown')).toBe('<unknown?>');
                });

                it('should translate a known translation', function () {

                    this.navigator.userLanguage = 'de-DE';

                    expect(this.translate('unknown')).toBe('<unknown?>');
                });
            });
        });

        describe('the person directive', function () {

            var injector = angular.injector(['ng', 'myApp']);
            var $rootScope = injector.get('$rootScope');
            var $compile = injector.get('$compile');
            var $templateCache = injector.get('$templateCache');

            //http://daginge.com/technology/2013/12/14/testing-angular-templates-with-jasmine-and-karma/

            beforeEach(function () {
                $templateCache.put(
                    'components/person.html',
                    '{{person.name()}} // ({{person.birthday}})');

            });

            it('should render the name and the birthday', function () {
                var person = {
                    birthday: '1.1.2016',
                    name: function () {
                        return "TESTER";
                    }
                };
                var scope = $rootScope.$new();
                scope.person = person;
                var element = $compile("<person person='person'>")(scope);
                scope.$digest();

                expect(element.html()).toContain("TESTER // (1.1.2016)");
            });
        });
    });
})();

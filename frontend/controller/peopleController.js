(function () {

    const controller = angular.module('controller', ['services']);

    class PeopleController {
        constructor(peopleService) {
            this._people = [];

            var refreshPeople = () => {
                this._people = peopleService.getAll();
            };

            refreshPeople();
        }

        allPeople() {
            return this._people;
        }

        allNames() {
            return this._people.map(function(p) {
                return p.lastname + "/" + p.firstname;
            });
        }
    }

    controller.controller("peopleController", ['peopleService', PeopleController]);

})();
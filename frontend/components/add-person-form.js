(function () {

	const module = angular.module('components');

	class AddPersonFormController {
		constructor(peopleService) {
			this._peopleService = peopleService;
			this.adding = false;
		}

		_reset() {
			this.person = commons.Person.empty();
		}

		addPerson() {
			this.adding = true;
			this._reset();
		}

		cancel() {
			this.adding = false;
		}

		save() {
			if (this.valid()) {
				this._peopleService.save(this.person);
				this.adding = false;
			}
		}

		valid() {
			return this.addPersonForm.$valid;
		}

	}

	module.directive('addPersonForm', function () {
		return {
			restrict: 'E',
			scope: {},
			controller: ['peopleService', AddPersonFormController],
			controllerAs: 'controller',
			bindToController: true,
			templateUrl: 'components/add-person-form.html'
		};
	});


})();


(function () {

	const module = angular.module('services');

	class ServiceConfiguration {
		constructor() {
			this.webServiceUrl = "test-url";
		}

		$get() {
			return {
				webServiceUrl: this.webServiceUrl
			}
		}
	}

	class DataRetriever {
		constructor(serviceConfig) {
			console.log("Loading data from " + serviceConfig.webServiceUrl);
			this.people = [
				new commons.Person({firstname: 'John', lastname: 'Doe', birthday: '1989-09-02'}),
				new commons.Person({firstname: 'Peter', lastname: 'Paan', birthday: '1989-09-02'}),
				new commons.Person({firstname: 'Jerry', lastname: 'TheCat', birthday: '1989-09-02'})
			];
		}

		loadPeople() {
			/* do webservice call...*/
			return this.people;
		}
	}

	class PeopleService {
		constructor(dataRetriever) {
			this.people = dataRetriever.loadPeople();
		}

		getAll() {
			return this.people;
		}

		save(person) {
			this.people.push(person);
		}
	}

	module.provider("serviceConfig", ServiceConfiguration);
	module.service('dataRetriever', ['serviceConfig', DataRetriever]);
	module.service('peopleService', ['dataRetriever', PeopleService]);

})();
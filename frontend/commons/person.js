var commons = commons || {};

(function () {

	class Person {
		constructor({ firstname: firstname, lastname: lastname, birthday: birthday }) {
			this.id = Person.idCounter++;
			this.firstname = firstname;
			this.lastname = lastname;
			this.birthday = Person.toDate(birthday);
		}

		name() {
			return this.firstname + " " + this.lastname;
		}

		static empty() {
			return new Person({firstname: undefined, lastname: undefined, birthday: undefined});
		}

		static toDate(d) {
			if(!d) {
				return undefined;
			}
			if (_.isDate(d)) {
				return d;
			}
			if (!_.isEmpty(d)) {
				return new Date(d);
			}
		}
	}

	Person.idCounter = 0;

	commons.Person = Person;
})();
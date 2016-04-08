(function () {

    const filter = angular.module('filter');

    const DEFAULT_LANGUAGE = 'en';

    class Translator {
        constructor($window) {
            this.$window = $window;
            this.texts = commons.translations;
        }

        lookup(key) {
            var lang = this.language(),
                langResult = this.findByKey(key, lang),
                result = langResult ? langResult : this.findByKey(key, DEFAULT_LANGUAGE);
            if (result) {
                return result;
            } else {
                return `[${key}]`;
            }
        }

        findByKey(key,lang) {
            var keys = this.texts[key];
            return keys ? keys[lang] : undefined;
        }

        language() {
            var language = this.$window.navigator.userLanguage || this.$window.navigator.language,
                separator = language ? language.indexOf('-') : DEFAULT_LANGUAGE;

            return separator > 0 ? language.substring(0, separator) : language;
        }
    }

    class Filter {
        static asFilterFunction(filterObject, functionName) {
            return filterObject[functionName].bind(filterObject);
        }
    }

    filter.filter("translate", ['$window', function ($window) {
        return Filter.asFilterFunction(new Translator($window), 'lookup');
    }]);

})();
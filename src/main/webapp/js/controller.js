/**
 * The controller object connects the model with the view.
 * This function requires an object that specifies the available input fields
 * and the validation rule that should be applied to those fields, e.g. {name: 'required'}.
 * As validation rules there are 'required' and 'email'. Multiple rules can also be combined into one string
 * @param inputFieldsWithValidationRules Map from fieldId to validation rule
 * @param view The view
 * @param model The model
 */
function controller(inputFieldsWithValidationRules, view, model) {
    var REQUIRED_RULE = "required";
    var EMAIL_RULE = "email";

    var SAVE_BUTTON = 'save';
    var EMAIL_REGEX = /.+@.+\..+/;
    var STATE_FIELD = 'state';

    validate();

    /**
     * Validates all fields according to the validation rule given in the constructor.
     */
    function validate() {
        var allValid = true;
        for (var fieldId in inputFieldsWithValidationRules) {
            var rule = inputFieldsWithValidationRules[fieldId];
            if (rule) {
                var value = view.getFieldState(fieldId).value;
                var valid = true;
                if (rule.indexOf(REQUIRED_RULE) != -1) {
                    valid = valid && validateRequiredValue(value);
                }
                if (rule.indexOf(EMAIL_RULE) != -1) {
                    valid = valid && validateEmailValue(value);
                }
                view.setFieldState(fieldId, {error: !valid});
                allValid = allValid && valid;
            }
        }
        view.setButtonEnabled(SAVE_BUTTON, allValid);
        return allValid;
    }

    function validateRequiredValue(value) {
        return !!value;
    }

    function validateEmailValue(value) {
        return !value || EMAIL_REGEX.test(value);
    }

    /**
     * Gets the current values from the view and saves them in the model.
     */
    function save() {
        if (!validate()) {
            return;
        }

        var customer = {};
        for (var fieldId in inputFieldsWithValidationRules) {
            customer[fieldId] = view.getFieldState(fieldId).value;
        }
        view.setFieldState(STATE_FIELD, {value: 'Speichern...'});
        model.saveCustomer(customer, function(customer) {
            view.setFieldState(STATE_FIELD, {value: 'Neuer Kunde mit der Id ' + customer.id});
        });
    }

    /** Public API **/
    return {
        validate: validate,
        save: save
    };
}
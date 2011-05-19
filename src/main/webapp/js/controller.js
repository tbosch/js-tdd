/**
 * The controller object connects the model with the view
 */
function controller() {
    var ALL_FIELDS = ['name', 'surname', 'street', 'plz', 'city', 'email'];
    var REQUIRED_FIELDS = ['name', 'surname', 'email'];
    var SAVE_BUTTON = 'save';
    var EMAIL_REGEX = /.+@.+\..+/;
    var STATE_FIELD = 'state';

    var view;
    var model;

    function init(pmodel, pview) {
        model = pmodel;
        view = pview;
        validateSyntax();
    }

    function fieldValueChanged(fieldId) {
        validateSyntax();
    }

    function validateSyntax() {
        var fields = {};
        foreachInList(ALL_FIELDS, function(id) {
            fields[id] = view.getFieldState(id);
            fields[id].error = false;
        });
        validateRequiredFields(fields);
        validateEmail(fields.email);
        var error = false;
        for (var id in fields) {
            var field = fields[id];
            if (field.error) {
                error = true;
            }
            view.setFieldState(id, {error: field.error});
        }
        view.setFieldState(SAVE_BUTTON, {enabled: !error});
        return !error;
    }

    function foreachInList(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i]);
        }
    }

    function validateRequiredFields(fields) {
        foreachInList(REQUIRED_FIELDS, function(id) {
            var value = fields[id].value;
            if (!value) {
                fields[id].error = true;
            }
        });
    }

    function validateEmail(field) {
        var value = field.value;
        if (!value || !EMAIL_REGEX.test(value)) {
            field.error = true;
        }
    }

    function action(fieldId) {
        if (fieldId == SAVE_BUTTON) {
            save();
        }
    }

    function save() {
        if (!validateSyntax()) {
            return;
        }

        var customer = {};
        foreachInList(ALL_FIELDS, function(id) {
            customer[id] = view.getFieldState(id).value;
        });
        view.setFieldState(STATE_FIELD, {value: 'saving...'});
        model.saveCustomer(customer, function(customer) {
            view.setFieldState(STATE_FIELD, {value: 'new id ' + customer.id});
        });
    }

    /** Public API **/
    return {
        init: init,
        fieldValueChanged: fieldValueChanged,
        action: action
    };
}
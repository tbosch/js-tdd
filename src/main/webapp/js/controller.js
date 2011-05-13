/**
 * The controller object connects the model with the view
 * @param model
 * @param view
 */
function controller(model, view) {
    var ALL_FIELDS = ['name', 'surname', 'street', 'plz', 'city', 'email'];
    var REQUIRED_FIELDS = ['name', 'surname', 'email'];
    var SAVE_BUTTON = 'save';
    var EMAIL_REGEX = /.+@.+\..+/;
    var STATE_FIELD = 'state';

    function foreachInList(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i]);
        }
    }

    function validateRequiredFields() {
        foreachInList(REQUIRED_FIELDS, function(id) {
            var value = view.getFieldValue(id);
            if (!value) {
                view.setFieldError(id, !value);
            }
        });
    }

    function validateEmail() {
        var email = view.getFieldValue('email');
        if (!email || !EMAIL_REGEX.test(email)) {
            view.setFieldError('email', true);
        }
    }

    function isValid() {
        var res = true;
        foreachInList(ALL_FIELDS, function(id) {
            if (view.isFieldError(id)) {
                res = false;
            }
        });
        return res;
    }

    function validateSyntax() {
        foreachInList(ALL_FIELDS, function(id) {
            view.setFieldError(id, false);
        });
        validateRequiredFields();
        validateEmail();
        var valid = isValid();
        view.setButtonEnabled(SAVE_BUTTON, valid);
    }

    function save() {
        var customer = {};
        foreachInList(ALL_FIELDS, function(id) {
            customer[id] = view.getFieldValue(id);
        });
        view.setFieldValue(STATE_FIELD, 'saving...');
        model.saveCustomer(customer, function(customer) {
            view.setFieldValue(STATE_FIELD, 'new id '+customer.id);
        });
    }

    function installListeners() {
        foreachInList(ALL_FIELDS, function(id) {
            view.addFieldChangeListener(id, validateSyntax);
        });
        view.addButtonListener(SAVE_BUTTON, save);
    }

    view.addLoadListener(function() {
        installListeners();
        validateSyntax();
    });
}
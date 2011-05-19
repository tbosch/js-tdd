/**
 * The View provides access to the html document
 */
function view() {
    /**
     * Initializes the view and installs the listener in the document.
     * The given callback needs to have the following functions:
     * - fieldValueChanged(id, value): Called when a field value is changed
     * - action(id): Called when a button is clicked
     * @param callback An object with
     */
    function init(callback) {

        function changeValueListener(event) {
            var element = event.target || event.srcElement;
            if (element) {
                var id = element.id;
                callback.fieldValueChanged(id);
            }
        }

        function actionListener(event) {
            var element = event.target || event.srcElement;
            var id = element.id;
            callback.action(id);
        }

        if (document.addEventListener) {
            document.addEventListener('keyup', changeValueListener, false);
            document.addEventListener('click', actionListener, false);
        } else {
            // IE
            document.attachEvent('onkeyup', changeValueListener);
            document.attachEvent('onclick', actionListener);
        }
    }

    function getFieldState(fieldId) {
        var element = document.getElementById(fieldId) || {};
        var res = {};
        if (element) {
            if (element.value != undefined) {
                res.value = element.value;
                res.error = isFieldError(element);
            }
            if (element.disabled != undefined) {
                res.enabled = !element.disabled;
            }
        }
        return res;
    }

    function setFieldState(fieldId, state) {
        var element = document.getElementById(fieldId);
        if (!element) {
            return;
        }
        if (state.value != undefined) {
            if (element.value == undefined) {
                throw new Error("field " + fieldId + " does not support setting a value");
            }
            element.value = state.value;
        }
        if (state.error != undefined) {
            if (element.value == undefined) {
                throw new Error("field " + fieldId + " does not support setting an error");
            }
            setFieldError(element, state.error);
        }
        if (state.enabled != undefined) {
            if (element.disabled == undefined) {
                throw new Error("field " + fieldId + " does not support setting the enabled flag");
            }
            element.disabled = !state.enabled;
        }
    }

    function setFieldError(element, errorFlag) {
        if (errorFlag) {
            element.className = 'error';
        } else {
            element.className = '';
        }
    }

    function isFieldError(element) {
        var className = element.className || '';
        return className.indexOf('error') != -1;
    }

    /**
     * Return an object with the public API
     */
    return {
        getFieldState: getFieldState,
        setFieldState: setFieldState,
        init: init
    };
}
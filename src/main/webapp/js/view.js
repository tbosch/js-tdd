/**
 * The View provides access to the html document
 * @param document
 */
function view(document) {
    function getFieldValue(fieldId) {
        var element = document.getElementById(fieldId);
        return element.value;
    }

    function setFieldValue(fieldId, value) {
        var element = document.getElementById(fieldId);
        element.value = value;
    }

    function setFieldError(fieldId, errorFlag) {
        var element = document.getElementById(fieldId);
        if (errorFlag) {
            element.className = 'error';
        } else {
            element.className = '';
        }
    }

    function isFieldError(fieldId) {
        var element = document.getElementById(fieldId);
        var className = element.className || '';
        return className.indexOf('error') != -1;
    }

    /**
     *
     * @param fieldId
     * @param listener Callback with signature function(fieldId, value)
     */
    function addFieldChangeListener(fieldId, listener) {
        var element = document.getElementById(fieldId);
        var lastValue;

        function callback() {
            var currValue = element.value;
            if (currValue != lastValue) {
                listener(fieldId, currValue);
                lastValue = currValue;
            }
        }
        element.addEventListener('change', callback, false);
        element.addEventListener('keyup', callback, false);
    }

    function setButtonEnabled(buttonId, enabled) {
        var element = document.getElementById(buttonId);
        element.disabled = !enabled;

    }

    function addButtonListener(buttonId, listener) {
        var element = document.getElementById(buttonId);
        function callback() {
            listener(buttonId);
        }
        element.addEventListener('click', callback, false);
    }

    function addLoadListener(listener) {
        window.addEventListener('load', listener, false);
    }

    /**
     * Return an object with the public API
     */
    return {
        getFieldValue: getFieldValue,
        setFieldValue: setFieldValue,
        setFieldError: setFieldError,
        isFieldError: isFieldError,
        addFieldChangeListener: addFieldChangeListener,
        addButtonListener: addButtonListener,
        setButtonEnabled: setButtonEnabled,
        addLoadListener: addLoadListener
    };
}
/**
 * The View provides access to the html document
 */
function view() {
    var eventListeners = {};

    function addEventListener(eventType, listener) {
        eventListeners[eventType] = listener;
        if (document.addEventListener) {
            document.addEventListener(eventType, listener, false);
        } else {
            // IE
            document.attachEvent('on'+eventType, listener);
        }
    }

    /**
     * Initializes the view and installs the listener in the document.
     * The given callback needs to have the following functions:
     * - validate: Called when a field value is changed
     * - {action}: Called when a button with the id {action} is clicked
     * @param callback
     */
    function init(callback) {

        function fieldChangeListener(event) {
            callback.validate();
        }

        function actionListener(event) {
            var element = event.target || event.srcElement;
            var id = element.id;
            if (element.nodeName=='BUTTON') {
                callback[id]();
            }
        }

        addEventListener('keyup', fieldChangeListener);
        addEventListener('click', actionListener);
    }

    /**
     * Unregisters all listeners
     */
    function destroy() {
        for (var eventType in eventListeners) {
            var listener = eventListeners[eventType];
            if (document.addEventListener) {
                document.removeEventListener(eventType, listener, false);
            } else {
                // IE
                document.detachEvent('on'+eventType, listener);
            }
        }
    }

    /**
     * Returns the state of the field with the given id. The state contains
     * the following properties: value, error
     * @param fieldId
     */
    function getFieldState(fieldId) {
        var element = document.getElementById(fieldId) || {};
        var res = {};
        if (element) {
            res.value = element.value;
            res.error = isFieldError(element);
        }
        return res;
    }

    /**
     * Sets the state of the field with the given id. The state may contain the following
     * properties: value, error. Only those properties that are contained in the
     * given state are applied.
     * @param fieldId
     * @param state
     */
    function setFieldState(fieldId, state) {
        var element = document.getElementById(fieldId);
        if (!element) {
            return;
        }
        if (state.value != undefined) {
            element.value = state.value;
        }
        if (state.error != undefined) {
            setFieldError(element, state.error);
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

    function setButtonEnabled(buttonId, enabled) {
        var element = document.getElementById(buttonId);
        if (!element) {
            return;
        }
        element.disabled = !enabled;
    }

    /**
     * Return an object with the public API
     */
    return {
        getFieldState: getFieldState,
        setFieldState: setFieldState,
        setButtonEnabled: setButtonEnabled,
        init: init,
        destroy: destroy
    };
}
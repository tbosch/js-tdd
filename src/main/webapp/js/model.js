/**
 * The Model provides access to the backend.
 * This function returns an object with the public API for the Model.
 */
function model() {
    var XHR_COMPLETE_READY_STATE = 4;
    var CUSTOMER_URL = '/js-tdd/rest/customers';

    function createXhrOnReadyStateChange(xhr, callback) {
        return function() {
            if (xhr.readyState == XHR_COMPLETE_READY_STATE) {
                var responseText = xhr.responseText;
                var jsonResponse = null;
                if (responseText) {
                    jsonResponse = window.JSON.parse(responseText);
                }
                callback(jsonResponse);
            }
        };
    }

    function sendPOSTRequest(url, params, callback) {
        var xhr = new window.XMLHttpRequest();
        var stringData = window.JSON.stringify(params);
        xhr.open('POST', url);
        xhr.onreadystatechange = createXhrOnReadyStateChange(xhr, callback);
        xhr.send(stringData);
    }

    function saveCustomer(customer, callback) {
        sendPOSTRequest(CUSTOMER_URL, customer, callback);
    }


    // return an object for the public API
    return {
        saveCustomer: saveCustomer
    };
}


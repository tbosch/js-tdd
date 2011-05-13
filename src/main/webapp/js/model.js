/**
 * The Model provides access to the backend.
 * This function returns an object with the public API for the Model.
 * @param XHRConstructor
 * @param json
 */
function model(XHRConstructor, json) {
    var XHR_COMPLETE_READY_STATE = 4;
    var CUSTOMER_URL = 'rest/customer';

    function createXhrOnReadyStateChange(xhr, callback) {
        return function() {
            if (xhr.readyState == XHR_COMPLETE_READY_STATE) {
                var responseText = xhr.responseText;
                var jsonResponse = null;
                if (responseText) {
                    jsonResponse = json.parse(responseText);
                }
                callback(jsonResponse);
            }
        };
    }

    function sendPOSTRequest(url, params, callback) {
        var xhr = new XHRConstructor();
        var stringData = json.stringify(params);
        xhr.open('POST', url);
        xhr.onreadystatechange = createXhrOnReadyStateChange(xhr, callback);
        xhr.send(stringData);
    }

    function sendGETRequest(url, callback) {
        var xhr = new XHRConstructor();
        xhr.open('GET', url);
        xhr.onreadystatechange = createXhrOnReadyStateChange(xhr, callback);
        xhr.send();
    }

    function loadCustomerById(customerId, callback) {
        sendGETRequest(CUSTOMER_URL+"/"+customerId, callback);
    }


    function saveCustomer(customer, callback) {
        sendPOSTRequest(CUSTOMER_URL+"/-1", customer, callback);
    }


    // return an object for the public API
    return {
        loadCustomerById: loadCustomerById,
        saveCustomer: saveCustomer
    };
}


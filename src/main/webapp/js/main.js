/**
 Main JavaScript files that connects the parts
 **/
(function() {
    var v = view(document);
    var m = model(window.XMLHttpRequest, window.JSON);
    controller(m, v);
})();
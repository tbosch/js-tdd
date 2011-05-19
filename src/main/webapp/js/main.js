/**
 Main JavaScript files that connects the parts
 **/
(function() {
    var v = view();
    var m = model();
    var c = controller();
    v.init(c);
    c.init(m,v);
})();
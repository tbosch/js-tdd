/**
 Main JavaScript files that connects the parts
 **/
(function() {
    var v = view();
    var m = model();
    var c = controller({
                name: 'required',
                surname: 'required',
                street: '',
                plz: '',
                city: '',
                email:'required email'
            },v,m);
    v.init(c);
})();
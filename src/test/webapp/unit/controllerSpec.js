describe("controller", function() {
    var ALL_VALUE_FIELDS = ['state', 'name', 'surname', 'street', 'plz', 'city', 'email'];
    var ALL_BUTTONS = ['save'];

    function foreachInList(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i]);
        }
    }

    function allFieldsValid() {
        fields['name'].value = 'A';
        fields['surname'].value = 'A';
        fields['email'].value = 'a@b.c';
    }

    var c, fields, savedCustomer, saveFinished;
    beforeEach(function() {
        var v = view();
        var m = model();
        c = controller();
        spyOn(v, 'getFieldState').andCallFake(function(id) {
            return fields[id];
        });
        spyOn(v, 'setFieldState').andCallFake(function(id, state) {
            for (var key in state) {
                fields[id][key] = state[key];
            }
        });

        fields = {};
        foreachInList(ALL_VALUE_FIELDS, function(id) {
            fields[id] = {
                value: '',
                error: false,
                enabled: true
            };
        });
        foreachInList(ALL_BUTTONS, function(id) {
            fields[id] = {
                enabled: true
            };
        });

        spyOn(m, 'saveCustomer').andCallFake(function(customer, callback) {
            savedCustomer = customer;
            saveFinished = callback;
        });

        v.init(c);
        c.init(m, v);
    });

    it('should require the name, surname and email fields', function() {
        foreachInList(['name', 'surname', 'email'], function(id) {
            fields[id].value = '';
            c.fieldValueChanged(id);
            expect(fields[id].error).toEqual(true);
        });
    });

    it('should not require the street, plz and city fields', function() {
        foreachInList(['street', 'plz', 'city'], function(id) {
            fields[id].value = '';
            c.fieldValueChanged(id);
            expect(fields[id].error).toEqual(false);
        });
    });

    it('should validate the email field for syntax x@y.z', function() {
        var id = 'email';
        var field = fields[id];
        foreachInList(['','asdf','asdf.asdf','asdf@asdf', 'asdf@asdf.'], function(pattern) {
            field.value = pattern;
            c.fieldValueChanged(id);
            expect(fields[id].error).toEqual(true);
        });

        field.value = 'asdf@asdf.de';
        c.fieldValueChanged(id);
        expect(fields[id].error).toEqual(false);
    });

    it('should enable the save button if all fields are valid', function() {
        allFieldsValid();
        c.fieldValueChanged('name');
        expect(fields['save'].enabled).toEqual(true);
    });


    it('should disable the save button if a field is invalid', function() {
        foreachInList(['name', 'surname', 'email'], function(id) {
            allFieldsValid();
            fields[id].value = '';
            c.fieldValueChanged(id);
            expect(fields['save'].enabled).toEqual(false);
        });
    });

    it('should not save if a field is invalid', function() {
        foreachInList(['name', 'surname', 'email'], function(id) {
            allFieldsValid();
            c.fieldValueChanged(id);
            fields[id].value = '';
            // By purpose no fieldValueChanged call!
            expect(fields['save'].enabled).toEqual(true);
            savedCustomer = null;
            c.action('save');
            expect(savedCustomer).toBeFalsy();
        });
    });

    it('should save the values to the model', function() {
        allFieldsValid();
        c.action('save');
        for (var id in savedCustomer) {
            expect(savedCustomer[id]).toEqual(fields[id].value);
        }
    });

    it('should set the state during saving', function() {
        allFieldsValid();
        c.action('save');
        expect(fields['state'].value).toEqual('saving...');

        savedCustomer.id = 10;
        saveFinished(savedCustomer);
        expect(fields['state'].value).toEqual('new id ' + 10);

    });

});
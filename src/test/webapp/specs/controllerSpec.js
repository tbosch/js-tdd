describe("controller", function() {
    var v, m;
    beforeEach(function() {
        v = view();
        spyOn(v, 'getFieldState');
        spyOn(v, 'setFieldState');
        spyOn(v, 'setButtonEnabled');
        m = model();
        spyOn(m, 'saveCustomer');
    });

    it('should disable the save button when fields are invalid', function() {
        v.getFieldState.andReturn({value:''});
        var c = controller({name: 'required'}, v, m);
        expect(v.setButtonEnabled).toHaveBeenCalledWith('save', false);
    });

    it('should enable the save button when all fields are valid', function() {
        v.getFieldState.andReturn({value:'asdf'});
        var c = controller({name: 'required'}, v, m);
        expect(v.setButtonEnabled).toHaveBeenCalledWith('save', true);
    });

    it('should not mark non validated fields with an error', function() {
        v.getFieldState.andReturn({value:''});
        var c = controller({name: ''}, v, m);
        expect(v.setFieldState).not.toHaveBeenCalled();
    });

    it('should mark empty required fields with an error', function() {
        v.getFieldState.andReturn({value:''});
        var c = controller({name: 'required'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: true});
    });

    it('should not mark filled required fields with an error', function() {
        v.getFieldState.andReturn({value:'someValue'});
        var c = controller({name: 'required'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: false});
    });

    it('should mark email fields with an error that do not contain an @', function() {
        v.getFieldState.andReturn({value:'asdf'});
        var c = controller({name: 'email'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: true});
    });

    it('should mark email fields with an error that do not have a part before the @', function() {
        v.getFieldState.andReturn({value:'@asdf.de'});
        var c = controller({name: 'email'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: true});
    });

    it('should mark email fields with an error that do not have a domain', function() {
        v.getFieldState.andReturn({value:'asdf@'});
        var c = controller({name: 'email'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: true});
    });

    it('should mark email fields with an error that do not have a domain with a dot', function() {
        v.getFieldState.andReturn({value:'asdf@adsf'});
        var c = controller({name: 'email'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: true});
    });

    it('should not mark valid email fields with an error', function() {
        v.getFieldState.andReturn({value:'asdf@adsf.de'});
        var c = controller({name: 'email'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: false});
    });

    it('should not mark empty email fields with an error', function() {
        v.getFieldState.andReturn({value:''});
        var c = controller({name: 'email'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: false});
    });

    it('should mark empty required email fields with an error', function() {
        v.getFieldState.andReturn({value:''});
        var c = controller({name: 'required email'}, v, m);
        expect(v.setFieldState).toHaveBeenCalledWith('name', {error: true});
    });

    it('should not save if a field is invalid', function() {
        v.getFieldState.andReturn({value:''});
        var c = controller({name: 'required'}, v, m);
        c.save();
        expect(m.saveCustomer).not.toHaveBeenCalled();
    });

    it('should save the values to the model', function() {
        v.getFieldState.andReturn({value:'someValue'});
        var c = controller({name: '', surname: ''}, v,m);
        c.save();
        expect(m.saveCustomer).toHaveBeenCalled();
        var customer = m.saveCustomer.mostRecentCall.args[0];
        expect(customer.name).toEqual('someValue');
        expect(customer.surname).toEqual('someValue');
    });

    it('should set the state during saving', function() {
        v.getFieldState.andReturn({value:'someValue'});
        var c = controller({name: '', surname: ''}, v, m);
        c.save();
        expect(v.setFieldState.mostRecentCall.args).toEqual(['state', {value: 'Speichern...'}]);
        var customer = {id: 10};
        var finishedCallback = m.saveCustomer.mostRecentCall.args[1];
        finishedCallback(customer);
        expect(v.setFieldState.mostRecentCall.args).toEqual(['state', {value: 'Neuer Kunde mit der Id 10'}]);
    });

});
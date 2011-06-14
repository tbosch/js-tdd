describe("view", function() {
    var div, v, c, field, fieldId, button, buttonId;
    beforeEach(function() {
        div = document.createElement('div');
        div.innerHTML = '<input type="text" id="someField"><button id="save"></button>';
        document.getElementsByTagName("body")[0].appendChild(div);
        v = view();
        c = controller({}, v, model());
        spyOn(c, 'validate').andReturn();
        spyOn(c, 'save').andReturn();
        v.init(c)
        fieldId = 'someField';
        field = document.getElementById(fieldId);
        buttonId = 'save';
        button = document.getElementById(buttonId);
    });
    afterEach(function() {
        v.destroy();
        div.parentNode.removeChild(div);
    });

    it('should get the field value', function() {
        field.value = 'someValue';
        expect(v.getFieldState(fieldId).value).toEqual('someValue');
    });

    it('should set the field value', function() {
        v.setFieldState(fieldId, {value: 'someValue'});
        expect(field.value).toEqual('someValue');
    });

    it('should get the error class', function() {
        field.className = 'error';
        expect(v.getFieldState(fieldId).error).toBeTruthy();
    });

    it('should set the error class', function() {
        v.setFieldState(fieldId, {error: true});
        expect(field.className).toEqual('error');
    });

    it('should reset the error class', function() {
        v.setFieldState(fieldId, {error: false});
        expect(field.className).toBeFalsy();
    });

    it('should set the disabled flag on buttons', function() {
        v.setButtonEnabled(buttonId, false);
        expect(button.disabled).toBeTruthy();
    });
    it('should reset the disabled flag on buttons', function() {
        v.setButtonEnabled(buttonId, true);
        expect(button.disabled).toBeFalsy();
    });

    it('should call validate on the callback on keyup event for field', function() {
        jasmine.ui.simulate(field, 'keyup');
        expect(c.validate).toHaveBeenCalled();
    });

    it('should call action function on the callback on click event for button', function() {
        jasmine.ui.simulate(button, 'click');
        expect(c.save).toHaveBeenCalled();
    });
});

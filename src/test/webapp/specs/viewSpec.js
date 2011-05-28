describe("view", function() {
    var v, c, field, fieldId, button, buttonId;
    beforeEach(function() {
        $("body").append('<input type="text" id="mydata"><button id="save"></button>');
        v = view();
        c = controller({}, v, model());
        spyOn(c, 'validate').andReturn();
        spyOn(c, 'save').andReturn();
        v.init(c)
        fieldId = 'mydata';
        field = $('#'+fieldId)[0];
        buttonId = 'save';
        button = $('#'+buttonId)[0];
    });
    afterEach(function() {
        v.destroy();
        $(field).remove();
        $(button).remove();
    });
    /*
    it('should get the field value', function() {
        field.value = 'myval';
        expect(v.getFieldState(fieldId).value).toEqual('myval');
    });

    it('should set the field value', function() {
        v.setFieldState(fieldId, {value: 'myval'});
        expect(field.value).toEqual('myval');
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
    */
    it('should call validate on the callback on keyup event for field', function() {
        jasmine.ui.simulate(field, 'keyup');
        expect(c.validate).toHaveBeenCalled();
    });

    it('should call action function on the callback on click event for button', function() {
        jasmine.ui.simulate(button, 'click');
        expect(c.save).toHaveBeenCalled();
    });
});

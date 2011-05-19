describe("view", function() {
    var v, field, fieldId, button, buttonId, changed, actionCalled;
    beforeEach(function() {
        $("body").append('<input type="text" id="mydata"><button id="mybutton"></button>');
        v = view();
        var callback = {
            fieldValueChanged: function(id) {
                if (id==fieldId) {
                    changed = true;
                }
            },
            action: function(id) {
                if (id==buttonId) {
                    actionCalled = true;
                }
            }
        };
        changed = false;
        actionCalled = false;
        v.init(callback)
        field = $('#mydata')[0];
        fieldId = 'mydata';
        button = $('#mybutton')[0];
        buttonId = 'mybutton';
    });
    afterEach(function() {
        $(field).remove();
        $(button).remove();
    });
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

    it('should get the disabled flag', function() {
        field.disabled = true;
        expect(v.getFieldState(fieldId).enabled).toBeFalsy();
    });

    it('should set the disabled flag', function() {
        v.setFieldState(fieldId, {enabled: false});
        expect(field.disabled).toBeTruthy();
    });
    it('should reset the disabled flag', function() {
        v.setFieldState(fieldId, {enabled: true});
        expect(field.disabled).toBeFalsy();
    });
    it('should call fieldValueChanged on the callback on keyup event', function() {
        jasmine.ui.simulate(field, 'keyup');
        expect(changed).toBeTruthy();
    });
    it('should call action on the callback on click event', function() {
        jasmine.ui.simulate(button, 'click');
        expect(actionCalled).toBeTruthy();
    });
});

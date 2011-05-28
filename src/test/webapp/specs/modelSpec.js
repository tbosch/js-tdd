describe("model", function() {
    var m;

    beforeEach(function() {
        m = model();
    });

    it('should save a customer and assign an id', function() {
        var savedCustomer = null;
        runs(function() {
            m.saveCustomer({ name: 'a',email: 'a@b.c'},
                    function(customer) {
                        savedCustomer = customer;
                    });
        });
        waitsFor(function() {
            return savedCustomer != null;
        },'server call never completed', 4000);
        runs(function() {
            expect(savedCustomer.id).toBeTruthy();
        });
    });
});

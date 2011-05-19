describe("model", function() {
    var m;

    beforeEach(function() {
        m = model();
    });

    it('should save a customer and assign an id', function() {
        var savedCustomer;
        runs(function() {
            var customer = {
                name: 'a',
                email: 'a@b.c'
            };
            m.saveCustomer(customer, function(c) {
                savedCustomer = c;
            })
        });
        waitsFor(function() {
            return true && savedCustomer;
        });
        runs(function() {
            expect(savedCustomer.id).toBeTruthy();
        })
    });
});

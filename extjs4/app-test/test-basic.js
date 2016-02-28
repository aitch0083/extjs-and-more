describe("Basic Assumptions", function() {

    it("has ExtJS4 loaded", function() {
        expect(Ext).toBeDefined();
        expect(Ext.getVersion()).toBeTruthy();
        expect(Ext.getVersion().major).toEqual(4);
    });

    it("has loaded ExtJS4 code",function(){
        expect(ExtJS4).toBeDefined();
    });

    it("has defined the controller Basic", function(){
    	var exp = ExtJS4.app.getController('Basic');
    	expect(exp).toBeDefined();
    });

    it("Basic has defined the alias", function(){
    	var Ctrl = ExtJS4.app.getController('Basic');

    	expect(Ctrl.alias).not.toEqual(['basic']);
    	expect(Ctrl.alias).toContain('basic');
    })
});
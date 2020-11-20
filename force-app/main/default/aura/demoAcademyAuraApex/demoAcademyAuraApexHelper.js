({
    loadTypeList : function(component){
        var action = component.get('c.getPickList');

        action.setParams({
            objName : component.get('v.objName'),
            fldName : component.get('v.fldName')
        });
        action.setCallback(this,function(result){
            var resultValue = result.getReturnValue();

            component.set('v.typeList',resultValue);
        });
        $A.enqueueAction(action);
    },
    save : function(component) {
        var action = component.get('c.createAccount');
        
        action.setParams({
            ac : component.get('v.newAccount')
        });
        action.setCallback(this,function(result){
            var resultValue = result.getReturnValue();
            var toastEvent = $A.get("e.force:showToast");

            toastEvent.setParams({
                "title": "Account created!",
                "message": "Record ID: " + resultValue.Id,
                "type": "success"
            });
            toastEvent.fire();
        });
        $A.enqueueAction(action);
    }
})

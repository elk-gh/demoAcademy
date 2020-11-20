import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class DemoAcademyLWCDS extends LightningElement {
    // objectApiName is "Account" when this component is placed on an account record page
    @api objectApiName = 'Account';

    fields = [NAME_FIELD, TYPE_FIELD];

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
}
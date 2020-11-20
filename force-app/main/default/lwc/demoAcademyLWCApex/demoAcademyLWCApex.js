import { LightningElement, wire } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { getObjectInfo } from "lightning/uiObjectInfoApi";

import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import TYPE_FIELD from "@salesforce/schema/Account.Type";

export default class DemoAcademyLWCApex extends LightningElement {
  accountId;
  name = "";
  value = "";

  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  accountMetadata;

  @wire(getPicklistValues, {
    recordTypeId: "$accountMetadata.data.defaultRecordTypeId",
    fieldApiName: TYPE_FIELD
  })
  typePicklist;

  handleNameChange(event) {
    this.accountId = undefined;
    this.name = event.target.value;
  }

  // on select picklist value to show the selected value
  handleTypeChange(event) {
    this.value = event.detail.value;
  }

  createAccount() {
    const fields = {};
    fields[NAME_FIELD.fieldApiName] = this.name;
    const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
    createRecord(recordInput)
      .then((account) => {
        this.accountId = account.id;
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Account created",
            variant: "success"
          })
        );
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error creating record",
            message: error.body.message,
            variant: "error"
          })
        );
      });
  }
}

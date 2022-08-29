import * as React from "react";
import ChoiceGroupForm from "../ChoiceGroupForm";
import ComboBoxMultiCheck from "../ComboBoxMultiCheck";
import DatePickerForm from "../DatePickerForm";
import DropdownForm from "../DropdownForm";
import DropdownFormDepend from "../DropdownFormDepend";
 
import {FC} from 'react';
import PeoplePickerForm from "../PeoplePickerForm";
import TextareaForm from "../TextareaForm";
import TextFieldForm from "../TextFieldForm";
import FileUploadForm from '../FileUploadForm'
 
const DynamicFieldLoad = (fieldName:any, item:any) => {
  switch (fieldName) {
    case "ChoiceGroupForm":
      return <ChoiceGroupForm {...item} />;
    case "ComboBoxMultiCheck":
      return <ComboBoxMultiCheck {...item} />;
    case "DropdownForm":
      return <DropdownForm {...item} />;
    case "TextFieldForm":
      return <TextFieldForm {...item} />;
    case "FileUploadForm":
      return <FileUploadForm {...item} />;
    case "DropdownFormDepend":
      return <DropdownFormDepend {...item} />;
    case "DatePickerForm":
      return <DatePickerForm {...item} />;
    case "TextareaForm":
      return <TextareaForm {...item} />;
    case "PeoplePickerForm":
      return <PeoplePickerForm {...item} />;
    default:
      return "Component Missing";
  }
};
export default DynamicFieldLoad;

import { IDropdownOption } from "@fluentui/react";
import { Control, FieldValues } from "react-hook-form";

export interface DropDownFormProps {
  options: IDropdownOption | any;
  name: string;
  label: any;
  control: Control<FieldValues, any>;
  placeholder?: string;
  isRequired?: boolean;
  register?: any;
  isdisabled?: boolean;
}

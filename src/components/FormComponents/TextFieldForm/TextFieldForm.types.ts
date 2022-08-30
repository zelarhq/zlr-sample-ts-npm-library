import { Control, FieldValues } from "react-hook-form";

export interface TextFieldFormProps {
  name: string;
  label: string;
  control: Control<FieldValues, any>;
  isRequired?: boolean;
  isdisabled?: boolean;
  isReadyOnly?: boolean;
  defaultValue?: string;
}

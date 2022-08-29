import * as React from "react";
import {
  useFormContext,
  Controller,
  FieldErrors,
  Control,
} from "react-hook-form";
import { Dropdown, IDropdownOption } from "@fluentui/react";

export interface IDropDownProps {
  options: IDropdownOption | any;
  name: string;
  label: any;
  placeholder?: string;
  isRequired?: boolean;
  control?: Control<any>;
  register?: any; 
  id?:any
  isdisabled?:boolean
}

 const DropdownForm: React.FC<IDropDownProps> = ({
  name,
  label,
  options,
  placeholder,
  isRequired,
  id,
  isdisabled
  
  // control,
  // register 
}: IDropDownProps) => {
  const { control, register } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name={name}
        //rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          //console.log(value, "Dropdown");

          return (
            <>
            <input {...register(name)} hidden />
            <Dropdown
              placeholder={placeholder}
              label={label}
              options={options}
              required={isRequired}
              id={name}
              onBlur={onBlur}
              selectedKey={value}
              //onChange={onChange}
             {...register}
              onChange={(
                e: React.FormEvent<HTMLDivElement> | any,
                value1: IDropdownOption | any
              ) => {
                onChange(value1.key);
              }}
              errorMessage={error ? error.message : ""}
              disabled={isdisabled}              
            />
            </>
          );
        }}
      />
    </>
  );
};
export default DropdownForm;
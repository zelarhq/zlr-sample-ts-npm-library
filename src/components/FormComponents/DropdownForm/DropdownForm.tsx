import * as React from "react";
import { Controller } from "react-hook-form";
import { Dropdown, IDropdownOption } from "@fluentui/react";
import { DropDownFormProps } from "./DropdownForm.types";

const DropdownForm: React.FC<DropDownFormProps> = ({
  name,
  label,
  control,
  options,
  placeholder,
  isRequired,
  isdisabled,
}: DropDownFormProps) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <Dropdown
              placeholder={placeholder}
              label={label}
              options={options}
              required={isRequired}
              id={name}
              onBlur={onBlur}
              selectedKey={value}
              onChange={(
                e: React.FormEvent<HTMLDivElement> | any,
                value1: IDropdownOption | any
              ) => {
                onChange(value1.key);
              }}
              errorMessage={error ? error.message : ""}
              disabled={isdisabled}
            />
          );
        }}
      />
    </>
  );
};
export default DropdownForm;

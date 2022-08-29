import * as React from "react";
import {
  useFormContext,
  Controller,
  FieldErrors,
  Control,
} from "react-hook-form";
import { ComboBox, Dropdown, IDropdownOption } from "@fluentui/react";

export interface IComboBoxFormProps {
  options: IDropdownOption | any;
  name: string;
  label: any;
  placeholder?: string;
  isRequired?: boolean;
  control?: Control<any>;
  defaultSelectedKey?: any;
  register?: any;
}

const ComboBoxForm: React.FC<IComboBoxFormProps> = ({
  name,
  label,
  options,
  placeholder,
  isRequired,
  //control,
  defaultSelectedKey,
  //register,
}: IComboBoxFormProps) => {
  const { control, register } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          //console.log(defaultSelectedKey);
          //console.log(value);

          return (
            <>
              <input {...register(name)} hidden defaultValue={defaultSelectedKey} />
              <ComboBox
                defaultSelectedKey={defaultSelectedKey}
                {...register}
                label={label}
                multiSelect
                options={options}
                id={name}
                autoComplete="on"
                onChange={(
                  e: React.FormEvent<HTMLDivElement> | any,
                  value: IDropdownOption | any
                ) => {
                  onChange(value.text);
                }}
                errorMessage={error ? error.message : ""}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default ComboBoxForm;
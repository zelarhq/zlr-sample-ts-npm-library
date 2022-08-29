import * as React from "react";
import { FC, ReactElement } from "react";
import { TextField } from "@fluentui/react";
import { Controller, useFormContext } from "react-hook-form";

export interface ITextFieldFormProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  isdisabled?: boolean;
  isReadyOnly?: boolean;
  defaultValue?: string;
}

const TextFieldForm: FC<ITextFieldFormProps> = ({
  name,
  label,
  isRequired,
  isdisabled,
  isReadyOnly,
  defaultValue,
}: ITextFieldFormProps): ReactElement => {
  const { control, register } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field,
          fieldState: { error, invalid, isTouched, isDirty },
        }) => {
          return (
            <>
              <div
                className={
                  isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                }
              >
                <TextField
                  label={label}
                  disabled={isdisabled}
                  readOnly={isReadyOnly}
                  defaultValue={defaultValue}
                  {...field}
                  errorMessage={error ? error.message : ""}
                  className={
                    isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                  }
                />
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default TextFieldForm;

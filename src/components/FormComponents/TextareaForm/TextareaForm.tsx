import * as React from "react";
import { FC, ReactElement } from "react";
import { TextField } from "@fluentui/react";
import { Control, Controller, useFormContext } from "react-hook-form";

interface ITextareaFormProps {
  name: string;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadyOnly?: boolean;
  defaultValue?: string;
  rows?: number;
  control?: Control<any>;
}
const TextareaForm: FC<ITextareaFormProps> = ({
  name,
  label,
  isRequired,
  isDisabled,
  isReadyOnly,
  defaultValue,
  rows,
}: ITextareaFormProps): ReactElement => {
  const { control, register } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <input {...register(name)} hidden />
              <TextField
                {...field}
                required={isRequired}
                label={label}
                disabled={isDisabled}
                readOnly={isReadyOnly}
                defaultValue={defaultValue}
                errorMessage={error ? error.message : ""}
                multiline
                rows={rows}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default TextareaForm;

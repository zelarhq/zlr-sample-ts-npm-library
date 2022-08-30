import * as React from "react";
import { FC, ReactElement } from "react";
import { TextField } from "@fluentui/react";
import { Controller } from "react-hook-form";

import { TextFieldFormProps } from "./TextFieldForm.types";

const TextFieldForm: FC<TextFieldFormProps> = (
  props: TextFieldFormProps
): ReactElement => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field,
        fieldState: { error, invalid, isTouched, isDirty },
      }) => {
        return (
          <>
            <div
              className={
                props.isRequired
                  ? error
                    ? "errorGroup"
                    : "errorGroupStar"
                  : ""
              }
            >
              <TextField
                label={props.label || props.name}
                disabled={props.isdisabled || false}
                readOnly={props.isReadyOnly || false}
                defaultValue={props.defaultValue || ""}
                {...field}
                errorMessage={error ? error.message : ""}
                className={
                  props.isRequired
                    ? error
                      ? "errorGroup"
                      : "errorGroupStar"
                    : ""
                }
              />
            </div>
          </>
        );
      }}
    />
  );
};

export default TextFieldForm;

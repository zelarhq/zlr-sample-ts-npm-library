import * as React from "react";
import {
  useFormContext,
  Controller,
  FieldErrors,
  Control,
} from "react-hook-form";
import {
  ChoiceGroup,
  ComboBox,
  Dropdown,
  IDropdownOption,
  Label,
} from "@fluentui/react";

export interface IChoiceGroupFormProps {
  options: IDropdownOption | any;
  name: string;
  label: any;
  isRequired?: boolean;
  control?: Control<any>;
  defaultSelectedKey?: any;
  dependChoice?: any;
  isdisabled?:boolean;
}

 const ChoiceGroupForm: React.FC<IChoiceGroupFormProps> = ({
  name,
  label,
  options,
  isRequired,
  defaultSelectedKey,
  dependChoice,
  isdisabled  
}: //register,
IChoiceGroupFormProps) => {
  const { control, register, setValue } = useFormContext();
  const onChangeChoice = (e: any) => {
    if (e.target.value === "Yes") {
      dependChoice(true);
    } else {
      dependChoice(false);
    }
    setValue(name, e.target.value);
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => {
          return (
            <>
              <div
                className={
                  isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                }
              >
                <Label>{label}</Label>
                <div className="ChoiceGroup">
                  {options.map((item: any) => (
                    <label className="choicebtn" key={item.key} id={item.key}>
                      {/* <input hidden {...register(name)} /> */}
                      <input
                        name={name}
                        type="radio"
                        value={item.text}
                        onChange={(e) => {
                          onChange(e.target.value);
                          onChangeChoice(e);
                        }}
                        checked={item.text === value}
                        disabled={isdisabled}
                      />
                      <span>{item.text}</span>
                    </label>
                  ))}
                </div>
                <span className="error-message">
                  {error ? error.message : ""}
                </span>
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default ChoiceGroupForm;
import * as React from "react";
import {
  useFormContext,
  Controller,
  FieldErrors,
  Control,
} from "react-hook-form";
import {
  ComboBox,
  Dropdown,
  IComboBox,
  IComboBoxOption,
  IDropdownOption,
} from "@fluentui/react";

export interface IComboBoxFormProps {
  options: IDropdownOption | any;
  name: string;
  label: any;
  placeholder?: string;
  isRequired?: boolean;
  control?: Control<any>;
  defaultSelectedKey?: any;
  selectedKeys?: any;
  setSelectedKeys?: any;
  isdisabled?: boolean;
}

const ComboBoxMultiCheck: React.FC<IComboBoxFormProps> = ({
  name,
  label,
  options,
  placeholder,
  isRequired,
  //control,
  defaultSelectedKey,
  selectedKeys,
  setSelectedKeys,
  isdisabled,
}: //register,
IComboBoxFormProps) => {
  const { setValue, control, register } = useFormContext();
  //const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const onChanges = React.useCallback(
    (
      event: React.FormEvent<IComboBox>,
      option?: IComboBoxOption,
      index?: number,
      value?: string
    ): void => {
      let selected = option?.selected;
      if (option) {
        setSelectedKeys((prevSelectedKeys: any) =>
          selected
            ? [...prevSelectedKeys, option!.key as string]
            : prevSelectedKeys.filter((k: any) => k !== option!.key)
        );
      }
    },
    []
  );
  React.useEffect(() => {
    if (selectedKeys) {
      setValue(name, selectedKeys);
    }
  }, [selectedKeys]);
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          // console.log(value);
          return (
            <> 
              <ComboBox
                id={name}
                label={label}
                multiSelect
                selectedKey={value ? value : setSelectedKeys}
                options={options}
                onChange={onChanges}
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
export default ComboBoxMultiCheck;

import * as React from "react";
import { Controller, Control, useFormContext } from "react-hook-form";
import { Label, TextField } from "@fluentui/react";
import { PeoplePicker } from "./PeoplePicker";

export interface IPeoplePickerFormProps {
  //options: IDropdownOption | any;
  name: string;
  label: any;
  placeholder?: string;
  isRequired?: boolean;
  control?: Control<any>;
  recentPeoplePick?: any;
  allPeopleList?: any;
  selectedPeopleList?: any;
  isPeoplePickerDisabled?: boolean;
  itemLimt?: number;
  isdisabled?: boolean;
}

const PeoplePickerForm: React.FC<IPeoplePickerFormProps> = ({
  name,
  label,
  // options,
  placeholder,
  isRequired,
  //control,
  recentPeoplePick,
  allPeopleList,
  selectedPeopleList,
  isPeoplePickerDisabled,
  itemLimt,
  isdisabled,
}: IPeoplePickerFormProps) => {
  const inputReference = React.useRef<any>();
  const { setValue, watch, control, register, getValues } = useFormContext();
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<any>();
  React.useEffect(() => {
    if (currentSelectedItems) {
      setValue(name, currentSelectedItems);
    }
  }, [currentSelectedItems]);

  React.useEffect(() => {
    if (selectedPeopleList) {
      setValue(name, selectedPeopleList);
    }
    //inputReference.current.focus();
  }, [selectedPeopleList]);
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => {
          return (
            <>
              <div
                className={
                  isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                }
                style={isdisabled ? { pointerEvents: "none" } : {}}
              >
                <Label>{label}</Label>
                <PeoplePicker
                  onBlur={onBlur}
                  label={label}
                  onChange={onChange}
                  setCurrentSelectedItems={setCurrentSelectedItems}
                  recentPeoplePick={recentPeoplePick}
                  allPeopleList={allPeopleList}
                  selectedPeopleList={value ? value : selectedPeopleList}
                  isPeoplePickerDisabled={isPeoplePickerDisabled}
                  itemLimt={itemLimt}
                  disabled={isdisabled}
                />
                <div className={error ? "errorMessage" : ""}>
                  {error ? error.message : ""}
                </div>
              </div>
            </>
          );
        }}
      />
    </>
  );
};
export default PeoplePickerForm;

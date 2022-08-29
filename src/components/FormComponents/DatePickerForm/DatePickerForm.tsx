import * as React from "react";
import {
  useFormContext,
  Controller,
  FieldErrors,
  Control,
} from "react-hook-form";
import {
  addDays,
  addMonths,
  ChoiceGroup,
  ComboBox,
  DatePicker,
  DefaultButton,
  defaultDatePickerStrings,
  Dropdown,
  IDropdownOption,
} from "@fluentui/react";

export interface IDatePickerFormProps {
  options?: IDropdownOption | any;
  name: string;
  label: any;
  isRequired?: boolean;
  control?: Control<any>;
  placeholder?: any;
  minDate?: any;
  defaultSelectdate?: any;
  isdisabled?:boolean;
}

const DatePickerForm: React.FC<IDatePickerFormProps> = ({
  name,
  label,
  // control,
  isRequired,
  placeholder,
  minDate,
  defaultSelectdate,
  isdisabled
}: //register,
IDatePickerFormProps) => {
  const { control, register } = useFormContext();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    defaultSelectdate
  );
 
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => { 
          return (
            <>
              <div>
                <input
                  {...register(name)}
                  hidden
                  defaultValue={defaultSelectdate}
                  value={value}
                />
                <DatePicker
                  className={
                    isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                  }
                  placeholder={placeholder}
                  label={label}
                  id={name}
                  value={value ? new Date(value) : defaultSelectdate}
                  minDate={minDate}
                  onSelectDate={onChange}
                  disabled={isdisabled}
                />
                <div className={error ? "errorMessage" : ""}>
                  {error ? error.message : ""}
                </div>
                {/* <DefaultButton onClick={goPrevious} text="Previous" />
                 */}
                {/* <DefaultButton onClick={goNext} text="Next" /> */}
              </div>
            </>
          );
        }}
      />
    </>
  );
};
export default DatePickerForm;
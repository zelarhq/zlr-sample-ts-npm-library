import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { DefaultButton, IComboBoxOption, PrimaryButton } from "@fluentui/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FC, ReactElement } from "react";
import { IDynamicForm } from "./DynamicForm.types";
import DynamicFieldLoad from "../DynamicFields/DynamicHelper";

export const ALLMODULES: IComboBoxOption[] = [
  { key: "Controlled Docs", text: "Controlled Docs" },
  { key: "User Record", text: "User Record" },
  { key: "Event", text: "Event" },
  { key: "CAPA", text: "CAPA" },
  { key: "Change Control", text: "Change Control" },
  { key: "Partner", text: "Partner" },
  { key: "Risk Management", text: "Risk Management" },
  { key: "Admin Functions", text: "Admin Functions" },
];

const DynamicForm: FC = (): ReactElement => {
  const [allEditFormsData, setAllEditFormsData] = useState([]);
  const [QEmultiselectedKeys, setQeMultiselectedKeys] = useState<string[]>([]);
  // schema declaration validation
  const allEditFormsSchema: yup.SchemaOf<IDynamicForm> = yup.object().shape({
    UploadDocument: yup.object().nullable(),
    GxP_Document: yup.string().required(),
    GxP_Type: yup.array(),
    Department: yup.string().required(),
    Document_Title: yup.string().required(),
    Followup_Due_Date: yup.string(),
    Change_Reason: yup.string().when("GxP_Document", {
      is: "Yes",
      then: yup.string().required(),
    }),
    Owner: yup
      .array()
      .min(1)
      .max(1)
      .of(
        yup.object().shape({
          text: yup.string().min(1).required(),
        })
      )
      .nullable()
      .required(),
  });

  // react hooks form declearion
  const allFormsMethods = useForm<any>({
    defaultValues: {},
    mode: "all",
    resolver: async (data, context, options) => {
      return yupResolver(allEditFormsSchema)(data, context, options);
    },
  });

  // Submit all forms Data
  const allFormSubmit: SubmitHandler<any> = async (data: any, save: any) => {};

  // update the data to form
  //   useEffect(() => {
  //     Object.entries(allEditFormsData).forEach(([key, value]: any) => {
  //       allFormsMethods.setValue(key, value, { shouldValidate: true });
  //     });
  //   }, [allEditFormsData]);
 
  const CUSTOMJSON = [
    {
      type: "FileUploadForm",
      name: "Document upload",
      label: "Document upload",
      isRequired: true,
    },
    {
      type: "ChoiceGroupForm",
      name: "GxP_Document",
      label: "GxP Document?",
      isRequired: true,
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" },
      ],
    },
    {
      type: "ComboBoxMultiCheck",
      name: "GxP_Type",
      label: "GxP Type?",
      isRequired: true,
      options:ALLMODULES,
      placeholder: "Select",
      selectedKeys: [],
      setSelectedKeys: [],
    },
    {
      type: "DropdownForm",
      name: "Department",
      label: "Department",
      isRequired: true,
      options: [],
      placeholder: "Select",
    },
    {
      type: "TextFieldForm",
      name: "Document_Title",
      label: "Document Title",
      isRequired: true,
      isReadOnly: true,
    },
    {
      type: "DatePickerForm",
      name: "Followup_Due_Date",
      label: "Follow-up Due Date",
      minDate: new Date(),
      defaultSelectdate: new Date(),
    },
    {
      type: "TextareaForm",
      name: "Change_Reason",
      label: "Change Reason",
      rows: 3,
      isRequired: false,
    },
    {
      type: "PeoplePickerForm",
      name: "Owner",
      label: "Owner",
      allPeopleList: [],
      recentPeoplePick: [
        {
          key: 0,
          imageUrl:
            "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
          imageInitials: "PV",
          text: "sni",
          secondaryText: "Developer",
          tertiaryText: "In a meeting",
          optionalText: "Available at 4:00pm",
          isValid: true,
          presence: 0,
        },
      ],
      selectedPeopleList: [],
      isRequired: true,
      isPeoplePickerDisabled: false,
      itemLimt: 1,
    },
  ];
  const getAdditionalProps = (item: any) => {
    if (
      item.name === "GxP_Type"
    ) {
      item.selectedKeys = QEmultiselectedKeys;
      item.setSelectedKeys = setQeMultiselectedKeys;
    }
    return item;
  };
  return (
    <>
      <FormProvider {...allFormsMethods}>
        <form onSubmit={allFormsMethods.handleSubmit(allFormSubmit)}>
          <div className="content">
            {CUSTOMJSON?.map((item) => {
              const updatedItem = getAdditionalProps(item);
              return DynamicFieldLoad(item.type, updatedItem);
            })}
          </div>
          <div className="footer">
            <PrimaryButton
              text="Save"
              type="submit"
              onClick={allFormsMethods.handleSubmit(allFormSubmit)}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default DynamicForm;

import * as React from "react";
import { Controller, Control, useFormContext } from "react-hook-form";
import { TextField } from "@fluentui/react";
import "./FileUpload.scss";
import ConfirmDialog from "../../ConfirmDialog";
import { useBoolean } from "@fluentui/react-hooks";
import { FileUploader } from "react-drag-drop-files";

export interface IfileuploadProps {
  name: string;
  label: any;
  setValue?: any;
  placeholder?: string;
  isRequired?: boolean;
  control?: Control<any>;
  //blobUrl?: any;
  dataUri?: any;
  setDataUri?: any;
  requestType?: string;
}

const FileUploadForm: React.FC<IfileuploadProps> = ({
  name,
  label,
  placeholder,
  isRequired,
  //control,
  dataUri,
  setDataUri,
  requestType,
}: //setValue,
IfileuploadProps): React.ReactElement => {
  const { setValue, watch, control, register } = useFormContext();
  const [selectedItems, setSelectedItems] = React.useState<any>();
  const [isConfirmDialog, { toggle: toggleConfrimDialog }] = useBoolean(true);
  const [filenewc, setfilenewc] = React.useState<any>();
  const [fileTypesNew, setfileTypesNew] = React.useState<any>();

  const onConfrimSubmit = () => {
    toggleConfrimDialog();
  };
  const handleChange = (file: any) => {
    setfilenewc(file[0]);
    let fileUrl = file[0];
    setDataUri(file[0]);
    const fileName: any = file[0].name;
    const fileContent: File = file[0];
    setSelectedItems({ fileName, fileContent });
  };
  //const fileTypesNew = ["XLS","XLSX","DOC","DOCX","PPT","PPTX"];
  const fileFormat = (extFile: any) => {
    const ext = [
      ".jpg",
      ".jpeg",
      ".bmp",
      ".gif",
      ".png",
      ".svg",
      ".xlsx",
      ".doc",
      ".docm",
      ".docx",
      ".html",
      ".htm",
      ".odt",
      ".csv",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".zip",
    ];
    return ext.some((el) => extFile.endsWith(el));
  };

  const handleUpload = (e: any): void => {
    let fileUrl = e.target.files[0];
    if (!fileFormat(fileUrl.name)) {
      toggleConfrimDialog();
      setDataUri("");
    } else {
      setDataUri(e.target.files[0]);
      const fileName: any = e.target.files[0].name;
      const fileContent: File = e.target.files[0];
      setSelectedItems({ fileName, fileContent });
    }
  };

  React.useEffect(() => {
    if (selectedItems) {
      setValue(name, selectedItems);
    }
  }, [selectedItems]);

  React.useEffect(() => {
    if (requestType == "New Document") {
      setfileTypesNew(["PPT", "XLSX", "DOC", "DOCX", "XLS", "PPTX"]);
    } else {
      setfileTypesNew([
        "JPG",
        "JPEG",
        "BMP",
        "GIF",
        "PNG",
        "SVG",
        "DOCM",
        "HTML",
        "HTM",
        "ODT",
        "ZIP",
        "XLS",
        "XLSX",
        "DOC",
        "DOCX",
        "PPT",
        "PPTX",
      ]);
    }
  }, [requestType]);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error, isTouched, isDirty },
        }) => {
          return (
            <>
              <div className="fileuploadcalss" id="sampledivmial">
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name={name}
                  types={fileTypesNew}
                  value={dataUri && dataUri.name}
                  label={label}
                  className="fileuploadcalss"
                />
                <p>
                  {filenewc
                    ? `File name: ${filenewc.name}`
                    : "no files uploaded yet"}
                </p>
              </div>
              <div
                style={{ display: "none" }}
                id="upload-box"
                className={
                  isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                }
              >
                <input {...register(name)} hidden />
                <TextField
                  label={label}
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  value={dataUri && dataUri.name}
                  errorMessage={error ? error.message : ""}
                  className={
                    isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                  }
                />
                <div className="uploadButton">
                  <input
                    type="file"
                    ref={ref}
                    onBlur={onBlur}
                    onChange={(e: React.FormEvent<HTMLDivElement> | any) => {
                      //handleUpload(e);
                      onChange(handleUpload(e));
                    }}
                  />
                  Browse
                </div>
              </div>
              <ConfirmDialog
                toggleHideDialog={toggleConfrimDialog}
                hideDialog={isConfirmDialog}
                title=""
                discription="Please Upload Word, Excel, PowerPoint, PDF, Mp4, Jpg, PNG, HTML, and Scorm"
                onConfirm={onConfrimSubmit}
                dialogStatus="warning"
              ></ConfirmDialog>
            </>
          );
        }}
      />
    </>
  );
};
export default FileUploadForm;

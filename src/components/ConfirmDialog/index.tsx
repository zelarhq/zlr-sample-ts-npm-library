import {
  ContextualMenu,
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogType,
  IconButton,
  IIconProps,
  PrimaryButton,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import * as React from "react";
import "./confrimDialog.scss";

// import trashImg from "../../Assets/Images/icons/";
// import confirmImg from "../../Assets/Images/icons/Confirm.svg";
// import successImg from "../../Assets/Images/icons/success.svg";
// import warningImg from "../../Assets/Images/icons/warning.svg";

export interface IConfirmDialogProp {
  hideDialog: any;
  toggleHideDialog: any;
  title: string;
  discription: string;
  onConfirm: () => any;
  dialogStatus: string;
  subText?: string;
  image?:any
}

export interface IReactCompState
  extends React.ComponentState,
    IConfirmDialogProp {}

const ConfirmDialog = ({
  toggleHideDialog,
  hideDialog,
  title,
  discription,
  subText,
  onConfirm,
  dialogStatus,
  image
}: IConfirmDialogProp) => {
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);

  const modalPropsStyles = { main: { maxWidth: 450 } };
  const dragOptions = {
    moveMenuItemText: "Move",
    closeMenuItemText: "Close",
    menu: ContextualMenu,
  };
  const dialogContentProps = {
    type: DialogType.normal,
    title: title,
    subText: discription,
  };

  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: modalPropsStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable]
  );

  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={modalProps}
        className="confrimDialog"
      >
        {(() => {
          switch (dialogStatus) {
            case "confirm":
              return (
                <>
                  <DialogContent>
                    <img src={image} alt="" className="" />
                    <p className="ms-Dialog-title">{title}</p>
                    <p className="ms-Dialog-subText">{discription}</p>
                  </DialogContent>
                  <DialogFooter>
                    <DefaultButton
                      onClick={toggleHideDialog}
                      text="Cancel"
                      className="cancel"
                    />
                    <PrimaryButton
                      onClick={onConfirm}
                      text="Confirm"
                      className="submit"
                    />
                  </DialogFooter>
                </>
              );
            case "success":
              return (
                <>
                  <DialogContent>
                    <img src={image} alt="" className="" />
                    <p className="ms-Dialog-title">{title}</p>
                    <p className="ms-Dialog-subText">{discription}</p>
                  </DialogContent>
                  <DialogFooter>
                    <PrimaryButton
                      onClick={onConfirm}
                      text="Ok, Great"
                      className="submit"
                    />
                  </DialogFooter>
                </>
              );
            case "save":
              return (
                <>
                  <DialogContent>
                    <img src={image} alt="" className="" />
                    <p className="ms-Dialog-title">{title}</p>
                    <p className="ms-Dialog-subText">{discription}</p>
                  </DialogContent>
                  <DialogFooter>
                    <PrimaryButton
                      onClick={onConfirm}
                      text="Ok, Great"
                      className="submit"
                    />
                  </DialogFooter>
                </>
              );
            case "warning":
              return (
                <>
                  <DialogContent>
                    <img src={image} alt="" className="" />
                    <p className="ms-Dialog-title">{title}</p>
                    <p className="ms-Dialog-subText">{discription}</p>
                  </DialogContent>
                  <DialogFooter>
                    <PrimaryButton
                      onClick={toggleHideDialog}
                      text="Ok, Got it"
                      className="submit"
                    />
                  </DialogFooter>
                </>
              );
            case "delete":
              return (
                <>
                  <DialogContent>
                    <img src={image} alt="" className="" />
                    <p className="ms-Dialog-title">{title}</p>
                    <p className="ms-Dialog-subText">{discription}</p>
                  </DialogContent>
                  <DialogFooter>
                    <DefaultButton
                      onClick={toggleHideDialog}
                      text="Cancel"
                      className="cancel"
                    />
                    <PrimaryButton
                      onClick={onConfirm}
                      text="Confirm"
                      className="submit"
                    />
                  </DialogFooter>
                </>
              );
            default:
              return null;
          }
        })()}
      </Dialog>
    </>
  );
};

export default ConfirmDialog;

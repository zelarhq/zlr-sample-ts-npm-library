/* eslint-disable no-promise-executor-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  IBasePickerSuggestionsProps,
  IPeoplePickerItemSelectedProps,
  IPersonaProps,
  NormalPeoplePicker,
  PeoplePickerItem,
  ValidationState,
} from "@fluentui/react";
import * as React from "react";
import { FC, ReactElement, useEffect, useState } from "react";
//import { recentPeoplePick, allPeopleList } from "./PeopleData";
import "./PeoplePicker.scss";

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};
interface IUserDueDatesProps {
  onChangeHandler?: any;
  label: string;
  formValues?: any;
  setFormValues?: any;
  recentPeoplePick?: any;
  allPeopleList?: any;
  selectedPeopleList?: any;
  isValid?: any;
  isPeoplePickerDisabled?: boolean;
  itemLimt?: number;
  setCurrentSelectedItems?: any;
  onBlur?: any;
}
export interface IReactCompState
  extends React.ComponentState,
    IUserDueDatesProps {}
export const PeoplePicker: FC<IReactCompState> = ({
  onChangeHandler,
  label,
  onBlur,
  setCurrentSelectedItems,
  recentPeoplePick,
  allPeopleList,
  selectedPeopleList,
  isValid,
  isPeoplePickerDisabled,
  itemLimt,
}: IUserDueDatesProps): ReactElement => {
  const [delayResults, setDelayResults] = React.useState(false);
  const [isPickerDisabled, setIsPickerDisabled] = React.useState(
    isPeoplePickerDisabled
  );
  const [showSecondaryText, setShowSecondaryText] = React.useState(false);
  const [mostRecentlyUsed, setMostRecentlyUsed] =
    React.useState<IPersonaProps[]>(recentPeoplePick);
  const [peopleList, setPeopleList] =
    React.useState<IPersonaProps[]>(allPeopleList);
  const [preSelectedpeopleList, setpreSelectedpeopleList] =
    React.useState<IPersonaProps[]>(selectedPeopleList);

  const picker = React.useRef(null);

  const onFilterChanged: any = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      console.log(filteredPersonas);
      return filterPromise(filteredPersonas);
    }
    return [];
  };

  const filterPersonasByText = (filterText: string): IPersonaProps[] =>
    peopleList.filter((item) =>
      doesTextStartWith(item.text as string, filterText)
    );

  const filterPromise = (
    personasToReturn: IPersonaProps[]
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    }
    return personasToReturn;
  };

  const returnMostRecentlyUsed: any = (
    currentPersonas: IPersonaProps[]
  ): IPersonaProps[] | Promise<IPersonaProps[]> =>
    filterPromise(removeDuplicates(mostRecentlyUsed, currentPersonas));

  const onRemoveSuggestion = (item: IPersonaProps): void => {
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList
        .slice(0, indexPeopleList)
        .concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[] = mostRecentlyUsed
        .slice(0, indexMostRecentlyUsed)
        .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  const renderItemWithSecondaryText: any = (
    props: IPeoplePickerItemSelectedProps
  ) => {
    const newProps = {
      ...props,
      item: {
        ...props.item,
        ValidationState: ValidationState.valid,
        showSecondaryText: true,
      },
    };

    return <PeoplePickerItem {...newProps} />;
  };

  const onDisabledButtonClick = (): void => {
    setIsPickerDisabled(!isPickerDisabled);
  };

  const onToggleDelayResultsChange = (): void => {
    setDelayResults(!delayResults);
  };

  const onToggleShowSecondaryText = (): void => {
    setShowSecondaryText(!showSecondaryText);
  };
  const onPeoplePickerBlur = (e: any) => {
    // console.log(
    //   delayResults,
    //   isPickerDisabled,
    //   showSecondaryText,
    //   mostRecentlyUsed,
    //   peopleList
    // );
  };
  const onItemsChange = (items: any): void => {
    setCurrentSelectedItems(items);
  };

  //const [defaultPeople, setDefault] = useState<any>(selectedPeopleList);

  useEffect(() => {
    if (recentPeoplePick) {
      setMostRecentlyUsed(recentPeoplePick);
    }
  }, [recentPeoplePick]);

  useEffect(() => {
    if (allPeopleList) {
      setPeopleList(allPeopleList);
    }
  }, [allPeopleList]);

  useEffect(() => {
    if (selectedPeopleList) {
      setpreSelectedpeopleList(selectedPeopleList);
    }
  }, [selectedPeopleList]);

  // console.log(label,preSelectedpeopleList, "Rendering current list items", selectedPeopleList);

  return (
    <div>
      <NormalPeoplePicker
        // eslint-disable-next-line react/jsx-no-bind
        onResolveSuggestions={onFilterChanged}
        // eslint-disable-next-line react/jsx-no-bind
        onEmptyInputFocus={returnMostRecentlyUsed}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        className="ms-PeoplePicker"
        key="normal"
        // eslint-disable-next-line react/jsx-no-bind
        onRemoveSuggestion={onRemoveSuggestion}
        onRenderItem={
          showSecondaryText ? renderItemWithSecondaryText : undefined
        }
        onValidateInput={validateInput}
        selectionAriaLabel="Selected contacts"
        removeButtonAriaLabel="Remove"
        inputProps={{
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            onPeoplePickerBlur(e),
          "aria-label": `${delayResults}`,
        }}
        defaultSelectedItems={preSelectedpeopleList}
        componentRef={picker}
        onInputChange={onInputChange}
        onChange={onItemsChange}
        resolveDelay={300}
        disabled={isPickerDisabled}
        itemLimit={itemLimt}
        onBlur={onBlur}
        
      />
      {isValid}
    </div>
  );
};

function doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(
  personas: IPersonaProps[],
  possibleDupes: IPersonaProps[]
) {
  return personas.filter(
    (persona) => !listContainsPersona(persona, possibleDupes)
  );
}

function listContainsPersona(
  persona: IPersonaProps,
  personas: IPersonaProps[]
) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter((item) => item.text === persona.text).length > 0;
}

function convertResultsToPromise(
  results: IPersonaProps[]
): Promise<IPersonaProps[]> {
  return new Promise<IPersonaProps[]>((resolve, reject) =>
    setTimeout(() => resolve(results), 2000)
  );
}

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}

function validateInput(input: string): ValidationState {
  if (input.indexOf("@") !== -1) {
    return ValidationState.valid;
  }
  if (input.length > 1) {
    return ValidationState.warning;
  }
  return ValidationState.invalid;
}

/**
 * Takes in the picker input and modifies it in whichever way
 * the caller wants, i.e. parsing entries copied from Outlook (sample
 * input: "Aaron Reid <aaron>").
 *
 * @param input The text entered into the picker.
 */
function onInputChange(input: string): string {
  const outlookRegEx = /<.*>/g;
  const emailAddress = outlookRegEx.exec(input);

  if (emailAddress && emailAddress[0]) {
    return emailAddress[0].substring(1, emailAddress[0].length - 1);
  }

  return input;
}

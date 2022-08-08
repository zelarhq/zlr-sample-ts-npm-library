import React, { FC } from 'react';

import { PrimaryButtonProps } from './PrimaryButton.types';
import './PrimaryButton.css';

const PrimaryButton: FC<PrimaryButtonProps> = (props: any) => {
    return (
        <button className="primaryButton"
          style={{
            backgroundColor: "green",
            color: "white"
          }}
          onClick={props.onClick}
        >
          {props.children?.toUpperCase() || "Click here"}
        </button>
      );
}

export default PrimaryButton;

import React, { FC } from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';  

import { FluentButtonProps } from './FluentButton.types';
import './FluentButton.css';

const FluentButton: FC<FluentButtonProps> = (props: any) => {
    return (
        <DefaultButton className="fluentButton"
          style={{
            backgroundColor: "red",
            color: "white"
          }}
          onClick={props.onClick}
          text={props.children || 'Click Me !!'}
        />      
      );
}

export default FluentButton;

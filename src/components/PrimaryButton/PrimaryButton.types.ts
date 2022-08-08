import { MouseEventHandler } from 'react';

export interface PrimaryButtonProps {
    children: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}
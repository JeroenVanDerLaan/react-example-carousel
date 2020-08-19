import './TextButton.scss';
import * as React from 'react';

export interface TextButtonProps
{
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    children?: React.ReactNode;
}

const TextButton = React.forwardRef<HTMLAnchorElement, TextButtonProps>((props: React.PropsWithChildren<TextButtonProps>, ref: React.MutableRefObject<HTMLAnchorElement>) =>
{
    return <a
        className="text-button"
        onClick={props.onClick}
        ref={ref}
    >
        {props.children}
    </a>
});

export default TextButton;
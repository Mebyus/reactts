import * as React from 'react';

interface Props {
    value: string;
    onClick: () => void;
}

export function Square(props: Props): JSX.Element {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

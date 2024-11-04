import React, { forwardRef } from 'react';

import { isDefine } from '../../utils/isDefine.ts';
import './styles.css';

export type InputProps = {
    value?: string | null;
    onSearch: (text?: string | null) => void;
    onReset?: VoidFunction;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ value, onSearch, onReset, ...props }, ref) => {
    return (
        <div className="inputWrapper">
            <input
                type="text"
                value={value ?? ''}
                onInput={(e) => onSearch(e.currentTarget.value)}
                ref={ref}
                {...props}
            />
            {isDefine(value) && value.length > 0 && (
                <button className="inputWrapperButton" onClick={onReset}>
                    x
                </button>
            )}
        </div>
    );
});

Input.displayName = 'Input';

import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { isDefine } from '../../utils/isDefine.ts';

import { SelectOption } from './Select.tsx';

type SelectListProps = {
    isLoading?: boolean;
    currentOption?: SelectOption | null;
    options: SelectOption[];
    onSelect: (option: SelectOption) => void;
    optionRender?: (option: SelectOption) => ReactNode;
};

export const SelectList: React.FC<SelectListProps> = ({
    currentOption,
    options,
    onSelect,
    optionRender,
    isLoading = false,
}) => {
    return (
        <div className="select-menu-list">
            {!isLoading &&
                options.map((option) => {
                    const isDisabled = isDefine(option?.disabled) && option.disabled;
                    const isActive = currentOption?.id === option.id;
                    return (
                        <SelectListItem
                            key={option.id}
                            optionRender={optionRender}
                            option={option}
                            onSelect={onSelect}
                            isActive={isActive}
                            isDisabled={isDisabled}
                        />
                    );
                })}
            {options.length <= 0 && !isLoading && <div className="select-menu-list--empty">Данных нет</div>}
            {isLoading && <div className="select-menu-list--loading">Загузка</div>}
        </div>
    );
};

type SelectListItemProps = {
    option: SelectOption;
    isActive: boolean;
    isDisabled: boolean;
    onSelect: (item: SelectOption) => void;
    optionRender?: (option: SelectOption) => ReactNode;
};

const SelectListItem: React.FC<SelectListItemProps> = ({ isActive, isDisabled, option, optionRender, onSelect }) => {
    if (optionRender) {
        const element = optionRender(option);
        if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement, {
                onClick: () => onSelect(option),
                className: classNames(element.props.className, {
                    'select-menu-item--active': isActive,
                    'select-menu-item--disabled': isDisabled,
                }),
            });
        }
    }

    const className = classNames('select-menu-item', {
        'select-menu-item--active': isActive,
        'select-menu-item--disabled': isDisabled,
    });

    return (
        <div className={className}>
            <button disabled={isDisabled} onClick={() => onSelect(option)}>
                {option.label}
            </button>
        </div>
    );
};

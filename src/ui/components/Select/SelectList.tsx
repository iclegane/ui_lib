import classNames from 'classnames';
import React, { ReactNode } from 'react';

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
                    const isActive = currentOption?.id === option.id;
                    return (
                        <SelectListItem
                            key={option.id}
                            optionRender={optionRender}
                            option={option}
                            onSelect={onSelect}
                            isActive={isActive}
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
    onSelect: (item: SelectOption) => void;
    optionRender?: (option: SelectOption) => ReactNode;
};

const SelectListItem: React.FC<SelectListItemProps> = ({ isActive, option, optionRender, onSelect }) => {
    if (optionRender) {
        const element = optionRender(option);
        if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement, {
                onClick: () => onSelect(option),
                className: classNames(element.props.className, { 'select-menu-item--active': isActive }),
            });
        }
    }

    return (
        <div className={`select-menu-item ${isActive && 'select-menu-item--active'}`}>
            <button onClick={() => onSelect(option)}>{option.label}</button>
        </div>
    );
};

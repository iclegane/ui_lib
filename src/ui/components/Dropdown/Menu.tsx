import React from 'react';

import { isDefine } from '../../utils/isDefine.ts';

import { Item } from './Item.tsx';

type MenuProps = {
    onItemClick?: VoidFunction;
    children: React.ReactNode;
};

export const Menu: React.FC<MenuProps> = ({ children, onItemClick }) => {
    return (
        <div className="dropdown-menu">
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === Item) {
                    return React.cloneElement(child as React.ReactElement, {
                        onClick: () => {
                            if (isDefine(child.props.onClick)) {
                                child.props.onClick?.();
                                onItemClick?.();
                            }
                        },
                    });
                }
                return child;
            })}
        </div>
    );
};

import React, { useState, ReactElement } from 'react';

import './styles.css';
import { BasePopover } from '../BasePopover';
import { Item } from './Item.tsx';
import { Menu } from './Menu.tsx';
import { Trigger } from './Trigger.tsx';

type DropdownComponents = {
    Trigger: typeof Trigger;
    Menu: typeof Menu;
    Item: typeof Item;
};

type DropdownProps = {
    children: React.ReactNode;
};

export const Dropdown: React.FC<DropdownProps> & DropdownComponents = ({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { triggerElement, menuElement } = React.Children.toArray(children).reduce<{
        triggerElement: null | ReactElement;
        menuElement: null | ReactElement;
    }>(
        (acc, child) => {
            if (React.isValidElement(child)) {
                if (child.type === Trigger) {
                    acc.triggerElement = child;
                } else if (child.type === Menu) {
                    acc.menuElement = React.cloneElement(child as React.ReactElement, {
                        onItemClick: () => setIsOpen(false),
                    });
                }
            }
            return acc;
        },
        { triggerElement: null, menuElement: null },
    );

    return (
        <div className="dropdown">
            {React.isValidElement(triggerElement) && React.isValidElement(menuElement) && (
                <BasePopover
                    trigger={'click'}
                    position={'bottom'}
                    content={menuElement}
                    isOpen={isOpen}
                    onClose={setIsOpen}
                    {...props}
                >
                    {triggerElement}
                </BasePopover>
            )}
        </div>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

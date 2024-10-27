import React, { useState, ReactElement, cloneElement, forwardRef } from 'react';

import './styles.css';
import { Popover, PopoverProps } from '../Popover';

type DefaultProps = {
    children: React.ReactNode;
};

type DropdownComponents = {
    Trigger: typeof Trigger;
    Menu: typeof Menu;
    Item: typeof Item;
};

type DropdownProps = Pick<PopoverProps, 'position' | 'trigger'> & DefaultProps;

type ItemProps = {
    isLink?: boolean;
} & DefaultProps;

const Trigger = forwardRef<HTMLDivElement, DefaultProps>(({ children, ...props }, ref) => {
    return React.isValidElement(children)
        ? cloneElement(children as ReactElement, {
              ref,
              className: 'dropdown-trigger',
              ...props,
          })
        : null;
});

const Menu: React.FC<DefaultProps> = ({ children }) => <div className="dropdown-menu">{children}</div>;

const Item: React.FC<ItemProps> = ({ children, isLink }) => (
    <div className={`dropdown-item ${isLink ? 'dropdown-item--link' : null}`}>{children}</div>
);

export const Dropdown: React.FC<DropdownProps> & DropdownComponents = ({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const triggerElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Trigger,
    );
    const menuElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Menu,
    );

    return (
        <div className="dropdown">
            {React.isValidElement(triggerElement) && React.isValidElement(menuElement) && (
                <Popover
                    content={menuElement}
                    visible={isOpen}
                    onVisibleChange={(state) => setIsOpen(state)}
                    {...props}
                >
                    {triggerElement}
                </Popover>
            )}
        </div>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

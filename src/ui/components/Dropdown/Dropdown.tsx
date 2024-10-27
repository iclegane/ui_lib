import React, { createContext, useState, useContext, ReactElement, cloneElement, forwardRef } from 'react';

import './styles.css';
import { Popover } from '../Popover';

type Props = {
    children: React.ReactNode;
};

type DropdownProps = {
    Trigger: typeof Trigger;
    Menu: typeof Menu;
    Item: typeof Item;
};

const DropdownContext = createContext({
    isOpen: false,
    toggleDropdown: () => {},
});

const Trigger = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    const { toggleDropdown } = useContext(DropdownContext);

    return React.isValidElement(children)
        ? cloneElement(children as ReactElement, {
              ref,
              className: 'dropdown-trigger',
              onClick: toggleDropdown,
          })
        : null;
});

const Menu: React.FC<Props> = ({ children }) => <div className="dropdown-menu">{children}</div>;

const Item: React.FC<Props> = ({ children }) => <div className="dropdown-item">{children}</div>;

export const Dropdown: React.FC<Props> & DropdownProps = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const triggerElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Trigger,
    );
    const menuElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Menu,
    );

    return (
        <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
            <div className="dropdown">
                {triggerElement && (
                    <Popover
                        content={menuElement as ReactElement}
                        trigger={'click'}
                        position={'bottom'}
                        visible={isOpen}
                        onVisibleChange={toggleDropdown}
                    >
                        {triggerElement as ReactElement}
                    </Popover>
                )}
            </div>
        </DropdownContext.Provider>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

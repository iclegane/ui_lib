import React, { useState } from 'react';

import { BasePopover } from '../BasePopover';

export type PopoverProps = {
    position?: 'left' | 'right' | 'top' | 'bottom';
    trigger?: 'click' | 'hover';
    content: React.ReactElement | string;
    children: React.ReactElement;
    closeOnClickOutside?: boolean;
};

export const Popover: React.FC<PopoverProps> = ({
    trigger = 'click',
    content,
    position = 'top',
    closeOnClickOutside,
    children,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <BasePopover
            trigger={trigger}
            position={position}
            closeOnClickOutside={closeOnClickOutside}
            content={content}
            isOpen={isOpen}
            onClose={setIsOpen}
        >
            {children}
        </BasePopover>
    );
};

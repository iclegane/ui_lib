import { Transition } from '@headlessui/react';
import React from 'react';
import './styles.css';

type PopoverContentProps = {
    isOpen: boolean;
    content: React.ReactElement | string;
    position?: { top: number; left: number };
    beforeOpen?: VoidFunction;
    beforeLeave?: VoidFunction;
};

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ isOpen, position, content, beforeOpen, beforeLeave }, ref) => {
        return (
            <Transition
                show={isOpen}
                enter="transition-opacity ease-out duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                appear={true}
                beforeEnter={beforeOpen}
                beforeLeave={beforeLeave}
            >
                <div
                    ref={ref}
                    className="basePopover"
                    style={{ top: `${position?.top}px`, left: `${position?.left}px` }}
                >
                    {content}
                </div>
            </Transition>
        );
    },
);

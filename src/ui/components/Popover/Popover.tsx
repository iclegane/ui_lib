import { Transition, TransitionChild } from '@headlessui/react';
import React, { useRef, useState, useEffect, useCallback, Fragment } from 'react';
import { createPortal } from 'react-dom';

import { useLatest } from '../../hooks/useLatest.ts';
import { getRootNode } from '../../utils/getRootNode.tsx';

type Props = {
    position?: 'left' | 'right' | 'top' | 'bottom';
    trigger: 'click' | 'hover';
    content: React.ReactElement | string;
    children: React.ReactElement;
    closeOnClickOutside?: boolean;
};
const rootNode = getRootNode();
const offset = 15;
const triggerMap = {
    click: 'onClick',
    hover: 'onMouseEnter',
};

export const Popover: React.FC<Props> = ({
    content,
    position = 'top',
    children,
    closeOnClickOutside = true,
    trigger = 'click',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

    const targetRef = useRef<HTMLDivElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const isOpenRef = useLatest(isOpen);
    const closeOnClickOutsideRef = useLatest(closeOnClickOutside);

    const calculatePosition = useCallback(() => {
        if (!targetRef.current || !popoverRef.current) return;
        const popoverRect = targetRef.current.getBoundingClientRect();
        const targetRect = targetRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (position) {
            case 'top':
                top = targetRect.top - popoverRect.height - offset;
                left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
                break;
            case 'bottom':
                top = targetRect.bottom + offset;
                left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
                break;
            case 'left':
                top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;
                left = targetRect.left - popoverRect.width - offset;
                break;
            case 'right':
                top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;
                left = targetRect.right + offset;
                break;
        }

        setPopoverPosition({ top, left });
    }, []);

    const setChildrenProps = useCallback(() => {
        const childProps = {
            [triggerMap[trigger]]: () => setIsOpen(true),
        };

        if (trigger === 'hover') {
            childProps.onMouseLeave = () => setIsOpen(false);
        }

        return childProps;
    }, [trigger]);

    const clonedChildren = React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement, {
              ref: targetRef,
              ...setChildrenProps(),
          })
        : null;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!closeOnClickOutsideRef.current || !isOpenRef.current) return;

            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                !targetRef.current?.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            {clonedChildren}
            {rootNode &&
                createPortal(
                    <PopoverContent
                        beforeEnter={calculatePosition}
                        ref={popoverRef}
                        isOpen={isOpen}
                        content={content}
                        position={popoverPosition}
                    />,
                    rootNode,
                )}
        </>
    );
};
type PopoverContentProps = {
    isOpen: boolean;
    content: React.ReactElement | string;
    position: { top: number; left: number };
    beforeEnter?: VoidFunction;
};

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ isOpen, position, content, beforeEnter }, ref) => {
        return (
            <Transition show={isOpen} appear={true}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    beforeEnter={beforeEnter}
                >
                    <div
                        ref={ref}
                        style={{
                            position: 'absolute',
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            padding: '5px',
                        }}
                    >
                        {content}
                    </div>
                </TransitionChild>
            </Transition>
        );
    },
);

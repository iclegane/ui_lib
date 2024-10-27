import { Transition, TransitionChild } from '@headlessui/react';
import React, { useRef, useState, useEffect, useCallback, Fragment } from 'react';
import { createPortal } from 'react-dom';

import { useLatest } from '../../hooks/useLatest.ts';
import { debounce } from '../../utils/debounce.ts';
import { getRootNode } from '../../utils/getRootNode.tsx';
import { isDefine } from '../../utils/isDefine.ts';

import { calculatePosition } from './utils';

export type PopoverProps = {
    position?: 'left' | 'right' | 'top' | 'bottom';
    trigger: 'click' | 'hover';
    content: React.ReactElement | string;
    children: React.ReactElement;
    closeOnClickOutside?: boolean;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
};
const rootNode = getRootNode();
const offset = 5;
const resizeDelay = 300;

export const Popover: React.FC<PopoverProps> = ({
    content,
    position = 'top',
    children,
    closeOnClickOutside = true,
    trigger = 'click',
    visible,
    onVisibleChange,
}) => {
    const [isDefaultOpen, setIsDefaultOpen] = useState(false);

    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

    const targetRef = useRef<HTMLDivElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const isOpen = isDefine(visible) ? visible : isDefaultOpen;
    const isOpenRef = useLatest(isOpen);
    const closeOnClickOutsideRef = useLatest(closeOnClickOutside);

    const setPositions = useCallback(() => {
        if (!targetRef.current || !popoverRef.current) return;

        const { top, left } = calculatePosition(targetRef.current, popoverRef.current, {
            position,
            offset,
        });

        setPopoverPosition({ top, left });
    }, [position]);
    const setPositionsRef = useLatest(setPositions);

    const beforeOpen = () => {
        setPositions();
    };

    const togglePopover = useCallback(
        (state: boolean) => {
            if (onVisibleChange) {
                onVisibleChange(state);
            } else {
                setIsDefaultOpen(state);
            }
        },
        [onVisibleChange],
    );

    const getChildrenProps = useCallback(() => {
        const childProps: {
            onClick?: VoidFunction;
            onMouseLeave?: VoidFunction;
            onMouseEnter?: VoidFunction;
        } = {};

        if (trigger === 'click') {
            childProps.onClick = () => togglePopover(true);
        }

        if (trigger === 'hover') {
            childProps.onMouseEnter = () => togglePopover(true);
            childProps.onMouseLeave = () => togglePopover(false);
        }

        return childProps;
    }, [trigger]);

    const clonedChildren = React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement, {
              ref: targetRef,
              ...getChildrenProps(),
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
                isDefine(onVisibleChange) ? onVisibleChange(false) : setIsDefaultOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setPositionsRef.current();
        };

        const debouncedResize = debounce(handleResize, resizeDelay);

        window.addEventListener('resize', debouncedResize);

        return () => window.removeEventListener('click', debouncedResize);
    }, []);

    return (
        <>
            {clonedChildren}
            {rootNode &&
                createPortal(
                    <PopoverContent
                        beforeOpen={beforeOpen}
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
    beforeOpen?: VoidFunction;
};

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ isOpen, position, content, beforeOpen }, ref) => {
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
                    beforeEnter={beforeOpen}
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

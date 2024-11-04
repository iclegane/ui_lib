import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useLatest } from '../../hooks/useLatest.ts';
import { debounce } from '../../utils/debounce.ts';
import { getRootNode } from '../../utils/getRootNode.tsx';

import { PopoverContent } from './PopoverContent.tsx';
import { calculatePosition } from '../Popover/utils';

export type BasePopoverProps = {
    position: 'left' | 'right' | 'top' | 'bottom';
    trigger: 'click' | 'hover' | 'focus';
    content: React.ReactElement | string;
    closeOnClickOutside?: boolean;
    children: React.ReactElement;
    isOpen: boolean;
    onOpenChange: (isOpenState: boolean) => void;
};
const rootNode = getRootNode();
const offset = 5;
const resizeDelay = 300;

export const BasePopover: React.FC<BasePopoverProps> = ({
    isOpen,
    onOpenChange,
    closeOnClickOutside = true,
    content,
    position,
    trigger,
    children,
}) => {
    const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number }>();

    const targetRef = useRef<HTMLDivElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

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

    const togglePopover = (isOpen: boolean) => {
        onOpenChange(isOpen);
    };

    const beforeOpen = () => {
        setPositions();
    };

    const getChildrenProps = useCallback(() => {
        const childProps: {
            onClick?: VoidFunction;
            onFocus?: VoidFunction;
            onBlur?: VoidFunction;
            onMouseLeave?: VoidFunction;
            onMouseEnter?: VoidFunction;
        } = {};

        if (trigger === 'click') {
            childProps.onClick = () => togglePopover(true);
        }

        if (trigger === 'focus') {
            childProps.onFocus = () => togglePopover(true);
            //childProps.onBlur = () => togglePopover(false);
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
                togglePopover(false);
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

        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    return (
        <>
            {clonedChildren}
            {rootNode &&
                createPortal(
                    <PopoverContent
                        ref={popoverRef}
                        isOpen={isOpen}
                        beforeOpen={beforeOpen}
                        content={content}
                        position={popoverPosition}
                    />,
                    rootNode,
                )}
        </>
    );
};

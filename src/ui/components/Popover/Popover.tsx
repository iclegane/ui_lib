import { Transition, TransitionChild } from '@headlessui/react';
import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { useLatest } from '../../hooks/useLatest.ts';
import { getRootNode } from '../../utils/getRootNode.tsx';

type Props = {
    position?: 'left' | 'right' | 'top' | 'bottom';
    content: React.ReactElement;
    children: React.ReactElement;
    closeOnClickOutside?: boolean;
};
const rootNode = getRootNode();
const offset = 5;

export const Popover: React.FC<Props> = ({ content, position = 'top', children, closeOnClickOutside = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const targetRef = useRef<HTMLDivElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const calculatePosition = useCallback(() => {
        if (!targetRef.current || !popoverRef.current) return;
        const targetRect = targetRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();

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

    const isOpenRef = useLatest(isOpen);
    const closeOnClickOutsideRef = useLatest(closeOnClickOutside);

    //todo: проверить на валидность компонента, строки и массивы
    const clonedChildren = React.cloneElement(children, {
        ref: targetRef,
        onClick: () => setIsOpen((prev) => !prev),
    });

    useLayoutEffect(() => {
        if (!isOpen) {
            return;
        }

        calculatePosition();
    }, [isOpen]);

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
                isOpen &&
                createPortal(
                    <PopoverContent
                        isOpen={isOpen}
                        content={content}
                        position={popoverPosition}
                        popoverRef={popoverRef}
                    />,
                    rootNode,
                )}
        </>
    );
};

const PopoverContent: React.FC<{
    isOpen: boolean;
    content: React.ReactElement;
    position: { top: number; left: number };
    popoverRef: React.RefObject<HTMLDivElement>;
}> = ({ isOpen, content, position, popoverRef }) => {
    //todo: проверить на валидность компонента, строки и массивы
    const clonedContent = React.cloneElement(content, {
        ref: popoverRef,
        style: {
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '5px',
        },
    });

    return (
        <Transition show={isOpen} appear={true}>
            <TransitionChild
                enter="ease-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-500"
                leave="ease-in duration-1500"
                leaveFrom="opacity-1500"
                leaveTo="opacity-0"
            >
                {clonedContent}
            </TransitionChild>
        </Transition>
    );
};

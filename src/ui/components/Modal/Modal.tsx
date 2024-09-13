import './style.css';
import { Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { useESCHandler } from '../../hooks/useESCHandler.tsx';
import { getRootNode } from '../../utils/getRootNode.tsx';

import { ModalProps } from './types.ts';

const rootNode = getRootNode();

export const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, content, footer }) => {
    useESCHandler({ isOpen, onClose });

    return (
        rootNode &&
        createPortal(
            <Transition show={isOpen} appear={true}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={'modal-container '}>
                        <div onClick={onClose} className="modal-container__overlay" />
                        <div className="modal-container-content modal-container-content--centered">
                            <div className="modal-container-content__header">
                                {title}
                                <button className="width-5" type="button" onClick={onClose}>
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18 17.94 6M18 18 6.06 6"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="modal-container-content__body">{content}</div>
                            <div className="modal-container-content__footer">{footer}</div>
                        </div>
                    </div>
                </TransitionChild>
            </Transition>,
            rootNode,
        )
    );
};

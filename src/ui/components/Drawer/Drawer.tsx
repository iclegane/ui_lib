import {React, Fragment, useState} from 'react'
import { createPortal } from 'react-dom';
import {getComponentId} from '../../Modules/VisibleComponents'
import './style.css'
import { getRootNode } from '../../utils/getRootNode.tsx';
import { useESCHandler } from '../../hooks/useESCHandler.tsx';
import {Transition} from "@headlessui/react";

const rootNode = getRootNode()
 
type DrawerType = {
    isOpen: boolean;
    content?: React.ReactNode;
    onClose?: VoidFunction;
}

export const Drawer: React.FC<DrawerType> = ({ isOpen, onClose, content }) => {
    const [id] = useState(() => getComponentId())
    useESCHandler({id, isOpen, onClose});

    const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClose?.();        
    }

    if (!isOpen) {
        return null
    }

    return rootNode && createPortal(
        <Transition show={isOpen} appear={true}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
            <div className='drawer-container'>
                <div onClick={onOverlayClick} className='drawer__overlay'></div>
                <div className='drawer-container-content'>
                    {content}
                </div>
            </div>
            </Transition.Child>
        </Transition>
        , rootNode
    );

}
import {React, Fragment} from 'react'
import { createPortal } from 'react-dom';
import './style.css'
import { getRootNode } from '../../utils/getRootNode.tsx';
import {Transition, TransitionChild} from "@headlessui/react";
import {useESCHandler} from "../../hooks/useESCHandler.tsx";

const rootNode = getRootNode()
 
type DrawerType = {
    isOpen: boolean;
    content?: React.ReactNode;
    onClose?: VoidFunction;
}

export const Drawer: React.FC<DrawerType> = ({ isOpen, onClose, content }) => {
    useESCHandler({isOpen, onClose});
    const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClose?.();        
    }

    return rootNode && createPortal(
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
            <div className='drawer-container'>
                <div onClick={onOverlayClick} className='drawer__overlay'></div>
                <div className='drawer-container-content'>
                    {content}
                </div>
            </div>
            </TransitionChild>
        </Transition>
        , rootNode
    );

}
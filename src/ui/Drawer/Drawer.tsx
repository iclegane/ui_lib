import React, { useState} from 'react'
import { createPortal } from 'react-dom';
import { getComponentId } from '../Modules/VisibleComponents'
import './style.css'
import { getRootNode } from '../utils/getRootNode';
import { useESCHandler } from '../hooks/useESCHandler';

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
        <div className='drawer-container'>
        <div onClick={onOverlayClick} className='drawer__overlay'></div>
        <div className='drawer-container-content'>
            {content}
        </div>
    </div>, rootNode
    );

}
import { ModalProps } from "./types"
import './style.css';
import { createPortal } from 'react-dom';
import {  useState } from "react";
import {  getComponentId } from '../Modules/VisibleComponents'
import { getRootNode } from "../utils/getRootNode";
import { useESCHandler } from "../hooks/useESCHandler";

const rootNode = getRootNode()
 
export const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, content, footer }) => {
    const [id] = useState(() => getComponentId());
    useESCHandler({id, isOpen, onClose});
 
    const openedClassName = isOpen ? 'modal-container--opened' : 'modal-container--closed'
 
    const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClose?.();        
    }

    if (!isOpen) {
        return null
    }
 
    return rootNode && createPortal(
        (
            <div className={`modal-container ${openedClassName}`}>
            <div onClick={onOverlayClick} className="modal-container__overlay"/>
            <div className="modal-container-content modal-container-content--centered">
                <div className="modal-container-content__header">
                    {title}
                    <button className="width-5" type="button" onClick={onClose}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                </div>
                <div className="modal-container-content__body">
                {content}    
                </div> 
                <div className="modal-container-content__footer">
                    {footer}
                </div> 
            </div>
        </div>), rootNode
    )
}
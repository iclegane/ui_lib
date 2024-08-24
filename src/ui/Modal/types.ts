import { ReactNode } from "react";

export type ModalProps = {
    isOpen: boolean;
    onClose: VoidFunction;
    title?: string;
    footer?: ReactNode;
    content?: ReactNode;
}
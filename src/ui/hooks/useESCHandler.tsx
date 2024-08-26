import {useCallback, useEffect} from "react";
import {getData, setData} from "../Modules/VisibleComponents";

type ESCHandlerType = {
    id: number;
    isOpen: boolean;
    onClose?: VoidFunction;
}

export const useESCHandler = ({id, isOpen, onClose}: ESCHandlerType) => {

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            if (!isOpen) {
                return;
            }

            const visibleComponents = getData();
            const lastComponentId = visibleComponents[visibleComponents.length - 1];

            if (lastComponentId === id) {
                onClose?.();
            }

        }
    }, [id, onClose]);

    useEffect(() => {
        if (isOpen) {
            setData([...getData(), id]);
        } else {
            setData(getData().filter(componentId => componentId !== id));
        }

        return () => {
            setData(getData().filter(componentId => componentId !== id));
        };
    }, [id, isOpen]);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)

        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [handleKeyPress])
}
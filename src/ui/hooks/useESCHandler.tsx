import {useEffect, useRef} from "react";
import {layerManager} from "../Modules/VisibleComponents";

type ESCHandlerType = {
    isOpen: boolean;
    onClose: void;
}

export const useESCHandler = ({isOpen, onClose}: ESCHandlerType) => {
    const onCloseRef = useRef<void>()
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        return layerManager.addLayer(onCloseRef.current)
    }, [isOpen])
}
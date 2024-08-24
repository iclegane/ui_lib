import { useEffect } from "react";
import { getData, setData } from "../Modules/VisibleComponents";

type ESCHandlerType = {
    id: number;
    isOpen: boolean;
    onClose?: VoidFunction;
}

export const useESCHandler = ({id, isOpen, onClose}: ESCHandlerType) => {
    useEffect(() => {
        const onPressKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                const data = getData()

                const isClosble = Object.keys(data).reduce((_acc, item) => {
                    if (Number(item) > id && data[item]) {
                        return false
                    } else {
                        return true
                    }
                }, false);

                if (isClosble) {
                    onClose?.()
                }
            }
        }

        document.addEventListener('keydown', onPressKey)

        return () => document.removeEventListener('keydown', onPressKey)
    }, [onClose, isOpen, id])


    useEffect(() => {
        setData({ [id]: isOpen })
    }, [id, isOpen])
}
import { useEffect } from 'react';

import { useLatest } from './useLatest.ts';
import { layerManager } from '../Modules/VisibleComponents';

type ESCHandlerType = {
    isOpen: boolean;
    onClose: VoidFunction;
};

export const useESCHandler = ({ isOpen, onClose }: ESCHandlerType) => {
    const onCloseRef = useLatest<VoidFunction>(onClose);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handler = () => {
            onCloseRef.current();
        };

        const cleanUp = layerManager.addLayer(handler);

        return cleanUp;
    }, [isOpen, onCloseRef]);
};

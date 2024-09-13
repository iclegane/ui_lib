class layerManagerClass {
    private readonly closeStack: VoidFunction[] = [];
    constructor() {
        this.closeStack = [];
        this.init();
    }

    public addLayer = (closeF: VoidFunction): VoidFunction => {
        this.closeStack.push(closeF);

        return () => {
            const index = this.closeStack.lastIndexOf(closeF);
            if (index > -1) {
                this.closeStack.splice(index, 1);
            }
        };
    };

    private removeLayer = (): VoidFunction | undefined => {
        return this.closeStack.pop();
    };

    private init = () => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                const closeF = this.removeLayer();
                closeF?.();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
    };
}

export const layerManager = new layerManagerClass();

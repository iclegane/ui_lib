class layerManagerClass {
    private closeStack = void[]
    constructor() {
        this.closeStack = [];
        this.init();
    }

    public addLayer = (closeF: void) => {
        this.closeStack.push(closeF)
    }

    private init = () => {
        const  handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                const closeF = this.closeStack.pop();
                closeF();
            }
        }

        document.addEventListener('keydown', handleKeyPress)
    }
}

export const layerManager = new layerManagerClass();
let modalId = 0;
let visibleComponents: number[] = [];
 
export const getData = () => {
    return visibleComponents;
}

export const setData = (newData: number[]) => {
    visibleComponents = newData;
}


export const getComponentId = () => {
    return modalId++;
}
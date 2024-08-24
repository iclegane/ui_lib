type Type = Record<string, boolean>;

let modalId = 0;
let visibleComponents: Type = {};
 
export const getData = () => {
    return visibleComponents;
}

export const setData = (newData: Type) => {
    visibleComponents = {
        ...visibleComponents,
        ...newData,
    }
}

export const getComponentId = () => {
    return modalId++;
}
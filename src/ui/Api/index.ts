export type CitySelectItems = {
    cities: {
        id: number;
        code: string;
        description: string;
    }[];
};

export const ApiLoadOptions = async () => {
    return await fetch('https://run.mocky.io/v3/c67f9be7-33d2-488c-a8fa-061abc0e3ecd', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
};

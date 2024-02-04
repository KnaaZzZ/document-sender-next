export const getStorageData = async (dataName: string) => {
    return await localStorage.getItem(dataName);
}

export const setStorageData = async (dataName: string, data: any) => {
    await localStorage.setItem(dataName, data);
}
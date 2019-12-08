export const findItem = (data, key, id) => {
    return data.find(item => item[key] == id) 
}
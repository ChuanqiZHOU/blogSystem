

export const getToken = () => {
    const token = localStorage.getItem('token')
    return token
}

export const removeToken = () => {
    const result = window.localStorage.clear();
    return result
}

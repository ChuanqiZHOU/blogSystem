import jwt from 'jsonwebtoken'

export const setToken = (token={}) => {
    return jwt.sign(token, 'billzhou', { expiresIn: "5h" });
}

export const checkToken = (token = "") => {
    jwt.verify(token, 'billzhou', (err, decoded) => {
        if (err) token = false;
        else token = decoded
    });
    return token
}

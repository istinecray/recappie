const key = "token";

const getJwt = () => localStorage.getItem(key);
const removeJwt = () => localStorage.removeItem(key);
const setJwt = (jwt) => localStorage.setItem(key, jwt);

export { getJwt, removeJwt, setJwt };

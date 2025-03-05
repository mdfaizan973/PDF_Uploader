export const getUserInfo = (key) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    return userDetails?.userDetails ? userDetails?.userDetails[key] : null;
};

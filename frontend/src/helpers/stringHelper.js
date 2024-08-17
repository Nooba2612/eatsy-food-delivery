const hasUppercase = (str) => {
    const uppercasePattern = /[A-Z]/;
    return uppercasePattern.test(str);
};

const hasLowercase = (str) => {
    const lowercasePattern = /[a-z]/;
    return lowercasePattern.test(str);
};

const hasNumber = (str) => {
    const numberPattern = /\d/;
    return numberPattern.test(str);
};

export { hasUppercase, hasLowercase, hasNumber };

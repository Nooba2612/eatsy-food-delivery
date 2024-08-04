const regexNumbers = /[^\d]/;
const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const regexVietnamPhoneNumber = /(0[3|5|7|8|9])+([0-9]{9})\b/g;

export { regexNumbers, regexEmail, regexVietnamPhoneNumber };

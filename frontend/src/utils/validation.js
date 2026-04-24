export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => password.length >= 8;

export const validatePrice = (value) => Number.isFinite(Number(value)) && Number(value) >= 0;
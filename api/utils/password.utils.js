import bcrypt from 'bcrypt';

// Convertir una contraseña en un hash seguro
const hashearPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Comparar una contraseña con el hash guardado
const compararPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export {
    hashearPassword,
    compararPassword
};
const crypto = require('crypto');

// Генерация случайной строки для JWT_SECRET
const generateJWTSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // Генерируем строку длиной 32 байта (256 бит)
};

// Экспортируем функцию, чтобы можно было импортировать её из других файлов
module.exports = generateJWTSecret;
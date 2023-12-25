const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "NotWeakRoot1234",
    database: "car_showroom",
});

db.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
    } else {
        console.log("Подключение к базе данных успешно");
        // Создание таблицы, если ее нет
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS cars (
                id INT AUTO_INCREMENT PRIMARY KEY,
                make VARCHAR(255) NOT NULL,
                model VARCHAR(255) NOT NULL,
                year INT NOT NULL
            );
        `;
        db.query(createTableQuery, (err) => {
            if (err) {
                console.error("Ошибка при создании таблицы:", err);
            } else {
                console.log("Таблица успешно создана или уже существует");
            }
        });
    }
});

module.exports = db;
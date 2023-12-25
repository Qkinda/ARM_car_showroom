const express = require("express");
const db = require("./db");
const router = express.Router();

// Получение с определенным фильтром
router.get("/getCars", (req, res) => {
    try {
        let sql = "SELECT * FROM cars";

        const { make, year } = req.query;
        console.log(req.query);

        if (make) {
            sql += ` WHERE make = '${make}'`;
        }

        if (year) {
            if (make) {
                sql += ` AND year = ${year}`;
            } else {
                sql += ` WHERE year = ${year}`;
            }
        }

        console.log(sql);

        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.json(result);
        });
        
    } catch (err) {
        console.error("Error in /getCars:", err);
        res.status(500).send("Internal Server Error");
    }

});

router.post("/addCar", (req, res) => {
    const { make, model, year } = req.body;
    const insertCarQuery = `INSERT INTO cars (make, model, year) VALUES (?, ?, ?)`;
    db.query(insertCarQuery, [make, model, year], (err) => {
        if (err) {
            console.error("Ошибка при добавлении автомобиля:", err);
            res.status(500).send("Ошибка сервера");
        } else {
            console.log("Автомобиль успешно добавлен");
            res.status(200).send("Автомобиль успешно добавлен");
        }
    });
});

// Получение данных конкретной машины по ID
router.get("/getCar/:id", (req, res) => {
    const carId = req.params.id;
    const sql = "SELECT * FROM cars WHERE id = ?";
    db.query(sql, [carId], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result[0]);
    });
});

// Редактирование машины
router.put("/updateCar/:id", (req, res) => {
    const carId = req.params.id;
    const { make, model, year } = req.body;
    const updateCarQuery = `UPDATE cars SET make = ?, model = ?, year = ? WHERE id = ?`;
    db.query(updateCarQuery, [make, model, year, carId], (err) => {
        if (err) {
            console.error("Ошибка при редактировании автомобиля:", err);
            res.status(500).send("Ошибка сервера");
        } else {
            console.log("Автомобиль успешно отредактирован");
            res.status(200).send("Автомобиль успешно отредактирован");
        }
    });
});

// Удаление машины
router.delete("/deleteCar/:id", (req, res) => {
    const carId = req.params.id;
    const deleteCarQuery = `DELETE FROM cars WHERE id = ?`;
    db.query(deleteCarQuery, [carId], (err) => {
        if (err) {
            console.error("Ошибка при удалении автомобиля:", err);
            res.status(500).send("Ошибка сервера");
        } else {
            console.log("Автомобиль успешно удален");
            res.status(200).send("Автомобиль успешно удален");
        }
    });
});

module.exports = router;
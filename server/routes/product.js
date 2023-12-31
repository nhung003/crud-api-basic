var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/', function (req, res, next) {
    try {
        let sql = `SELECT * FROM products`; findAll
        db.query(sql, function (err, data) {
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Thất bại" });
    }
   
});

router.get('/:id', function (req, res, next) {
    try {
        let id = req.params.id;
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, id, (err, data) => {
            return res.status(200).json(data[0]);
        });
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Thất bại" });
    }
});

router.delete('/:id', function(req, res) { 
    try {
        let id = req.params.id;
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, id , (err, d) => {
            if (err) throw err;
            return res.status(200).json({ "Thông báo": "Đã xóa thành công" });
        }); 
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Thất bại" });
    }
   
});

router.post('/', function (req, res, next) {
    try {
        const data = {
            name: req.body.name,
            price: req.body.price,
        };
    
        const arr = Object.values(data);
        const arrValues = [arr];
    
        let sql = `INSERT INTO products (name, price) VALUES ?`;
        db.query(sql, [arrValues], (err, d) => {
            if (err) throw err;
            return res.status(200).json({ "Thông báo": "Thành công" });
        });
    } catch (error) {
        return res.status(500).json({ "Thông báo": "Thất bại" });
    }
   
});


router.put('/:id', function(req, res, next) {
    try {
        const data = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price,
        };
    
        const arr = Object.values(data);
        const arrValues = [arr];
    
        let sql = 'UPDATE products SET name=?, price=? WHERE id=?';
        db.query(sql, [data.name, data.price, data.id], (err, results) => {
            if (err) throw err;
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).json(data);
    }

});

module.exports = router;

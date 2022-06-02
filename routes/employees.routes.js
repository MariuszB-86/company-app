const express = require('express');
const router = express.Router();

const EmpoyeeController = require('../controllers/employees.controller');

router.get('/employees', EmpoyeeController.getAll);

router.get('/employees/random', EmpoyeeController.getRandom);

router.get('/employees/:id', EmpoyeeController.getById);

router.post('/employees', EmpoyeeController.post);

router.put('/employees/:id', EmpoyeeController.put);

router.delete('/employees/:id', EmpoyeeController.delete);

module.exports = router;

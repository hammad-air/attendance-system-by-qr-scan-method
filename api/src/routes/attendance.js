const express = require('express');
const attendance = express.Router();
const attendanceController = require('../controllers/attendance');

attendance.post('/', attendanceController.create);
attendance.get('/', attendanceController.list);

module.exports = attendance;
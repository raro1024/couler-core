const express = require('express');
const router = express.Router();

const db = require('../db.js');
const utils = require("../utils.js");
router.get('/*', (req, res)=>{
res.end("html");
});
module.exports = router;